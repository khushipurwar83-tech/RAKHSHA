from fastapi import APIRouter
from src.services.crime_prediction import crime_prediction_service

router = APIRouter()

@router.get("/risk/{lat}/{lng}")
async def get_crime_risk(lat: float, lng: float):
    return await crime_prediction_service.get_risk_score(lat, lng)
