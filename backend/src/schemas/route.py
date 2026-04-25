from pydantic import BaseModel
from typing import List, Dict

class LatLng(BaseModel):
    lat: float
    lng: float

class RouteRequest(BaseModel):
    start: LatLng
    end: LatLng

class RouteResponse(BaseModel):
    origin: LatLng
    destination: LatLng
    path: List[LatLng]
    total_risk: float
    distance_km: float
    estimated_time_mins: int
