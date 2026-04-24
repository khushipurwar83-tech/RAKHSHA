import requests
import os
from fastapi import HTTPException
from sqlalchemy import text
from shapely.geometry import LineString

# Example Route score algorithm based on user requirements:
# SafetyScore = (StreetLightWeight*0.3) + (CrimeHistoryWeight*0.4) + (UserReportsWeight*0.2) + (PolicePresenceWeight*0.1)

async def calculate_safety_score(route_geometry_geojson, db):
    # route_geometry_geojson is a dict containing 'coordinates' and 'type'
    
    try:
        # Convert GeoJSON coordinates to a PostGIS geometry
        # Note: OSRM returns coordinates as [lng, lat]
        coords = route_geometry_geojson['coordinates']
        linestring_wkt = f"LINESTRING({', '.join([f'{lng} {lat}' for lng, lat in coords])})"
        
        # 1. Count User Reports near the route (within 100 meters)
        reports_query = text("""
            SELECT COUNT(*) 
            FROM user_reports 
            WHERE ST_DWithin(
                location, 
                ST_GeomFromText(:wkt, 4326), 
                0.001 -- approx 100 meters
            )
        """)
        reports_count = db.execute(reports_query, {"wkt": linestring_wkt}).scalar() or 0
        
        # 2. Count Crime History near the route
        crime_query = text("""
            SELECT COUNT(*) 
            FROM crime_history 
            WHERE ST_DWithin(
                location, 
                ST_GeomFromText(:wkt, 4326), 
                0.001
            )
        """)
        crime_count = db.execute(crime_query, {"wkt": linestring_wkt}).scalar() or 0
        
        # 3. Safe Havens nearby (increases safety)
        havens_query = text("""
            SELECT COUNT(*) 
            FROM safe_havens 
            WHERE ST_DWithin(
                location, 
                ST_GeomFromText(:wkt, 4326), 
                0.002 -- approx 200 meters
            )
        """)
        havens_count = db.execute(havens_query, {"wkt": linestring_wkt}).scalar() or 0
        
        # Scoring Logic:
        # Start with 100, deduct for reports/crimes, add for safe havens
        score = 85.0 # Base safe score
        score -= (reports_count * 5)
        score -= (crime_count * 10)
        score += (havens_count * 3)
        
        # Clamp between 0 and 100
        return max(0, min(100, round(score, 2)))
    except Exception as e:
        print(f"Error calculating safety score: {e}")
        return 50.0 # Neutral fallback score

async def get_safest_route(start_lat, start_lng, end_lat, end_lng, db):
    # We will use OpenStreetMap / OSRM API to get the base routes.
    # A production app would host its own routing engine (e.g., OSRM/Valhalla) with custom edge weights.
    
    osrm_url = f"http://router.project-osrm.org/route/v1/foot/{start_lng},{start_lat};{end_lng},{end_lat}?overview=full&geometries=geojson&alternatives=true"
    
    response = requests.get(osrm_url)
    if response.status_code != 200:
        raise HTTPException(status_code=500, detail="Error fetching route from routing engine")
        
    data = response.json()
    if data.get("code") != "Ok":
        raise HTTPException(status_code=404, detail="No route found")
        
    routes = data.get("routes", [])
    
    processed_routes = []
    
    for idx, route in enumerate(routes):
        geometry = route['geometry'] # GeoJSON format
        
        # Calculate safety score based on intersections
        safety_score = await calculate_safety_score(geometry, db)
        
        processed_routes.append({
            "route_id": idx,
            "geometry": geometry,
            "distance": route['distance'],
            "duration": route['duration'],
            "safety_score": safety_score
        })
        
    # Sort routes by safety_score descending
    processed_routes.sort(key=lambda x: x['safety_score'], reverse=True)
    
    return {
        "safest_route": processed_routes[0],
        "alternatives": processed_routes[1:]
    }
