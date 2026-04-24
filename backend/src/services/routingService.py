import requests
import os
from fastapi import HTTPException
from shapely.geometry import LineString

# Example Route score algorithm based on user requirements:
# SafetyScore = (StreetLightWeight*0.3) + (CrimeHistoryWeight*0.4) + (UserReportsWeight*0.2) + (PolicePresenceWeight*0.1)

async def calculate_safety_score(route_geometry, db):
    # In a real-world scenario, you would query PostGIS to see how many
    # safe havens, street lights, and crime reports intersect with the route_geometry.
    
    # Mocking the calculation for Hackathon purposes:
    # We assume a base score and fluctuate it randomly based on distance for now.
    # To truly implement this, you'd use ST_Intersects or ST_DWithin in PostGIS.
    
    street_light_score = 0.8
    crime_history_score = 0.9 # High means safe (low crime)
    user_report_score = 0.85
    police_presence_score = 0.6
    
    safety_score = (street_light_score * 0.3) + \
                   (crime_history_score * 0.4) + \
                   (user_report_score * 0.2) + \
                   (police_presence_score * 0.1)
                   
    # Normalize to 1-100 scale
    return round(safety_score * 100, 2)

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
