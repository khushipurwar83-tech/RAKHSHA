from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.services.routingService import get_safest_route

async def get_route(start_lat: float, start_lng: float, end_lat: float, end_lng: float, db: Session):
    try:
        route_data = await get_safest_route(start_lat, start_lng, end_lat, end_lng, db)
        return route_data
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Failed to generate route: {str(e)}")
