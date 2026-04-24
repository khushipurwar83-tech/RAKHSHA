from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.controllers.safeHavenController import get_nearby_safe_havens, create_safe_haven
from pydantic import BaseModel

router = APIRouter()

class LocationSchema(BaseModel):
    latitude: float
    longitude: float

class SafeHavenCreateRequest(BaseModel):
    name: str
    type: str
    location: LocationSchema
    address: str = None
    contact_number: str = None

@router.get("/")
async def get_havens(lat: float, lng: float, radius: int = 5000, db: Session = Depends(get_db)):
    return await get_nearby_safe_havens(lat, lng, radius, db)

@router.post("/")
async def add_haven(data: SafeHavenCreateRequest, db: Session = Depends(get_db)):
    return await create_safe_haven(data.model_dump(), db)
