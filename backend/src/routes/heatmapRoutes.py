from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from src.config.database import get_db

router = APIRouter()

@router.get("/data")
async def get_heatmap_data(db: Session = Depends(get_db)):
    try:
        # Fetching data from crime_history and user_reports
        # We combine them into a list of weighted points for the heatmap
        
        # 1. Get Crimes
        crime_query = text("""
            SELECT ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat, severity 
            FROM crime_history
        """)
        crimes = db.execute(crime_query).fetchall()
        
        # 2. Get User Reports
        reports_query = text("""
            SELECT ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat, severity 
            FROM user_reports
        """)
        reports = db.execute(reports_query).fetchall()
        
        # Format the output for the mobile heatmap (Lat, Lng, Intensity)
        heatmap_points = []
        
        for c in crimes:
            heatmap_points.append({
                "latitude": c.lat,
                "longitude": c.lng,
                "weight": c.severity / 5.0 # Normalize intensity
            })
            
        for r in reports:
            heatmap_points.append({
                "latitude": r.lat,
                "longitude": r.lng,
                "weight": r.severity / 5.0
            })
            
        # If no data, return a mock point (for demo purposes)
        if not heatmap_points:
            heatmap_points = [
                {"latitude": 28.6139, "longitude": 77.2090, "weight": 0.8}, # Delhi mock
                {"latitude": 28.6239, "longitude": 77.2190, "weight": 0.5}
            ]
            
        return heatmap_points
    except Exception as e:
        print(f"Heatmap Error: {e}")
        return []
