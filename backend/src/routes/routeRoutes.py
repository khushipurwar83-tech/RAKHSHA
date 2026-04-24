from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.middleware.auth import verify_token
from src.controllers.routeController import get_route

router = APIRouter()

@router.get("/plan")
async def plan_route(
    start_lat: float = Query(..., description="Starting latitude"),
    start_lng: float = Query(..., description="Starting longitude"),
    end_lat: float = Query(..., description="Destination latitude"),
    end_lng: float = Query(..., description="Destination longitude"),
    db: Session = Depends(get_db),
    user_id: str = Depends(verify_token)
):
    return await get_route(start_lat, start_lng, end_lat, end_lng, db)
