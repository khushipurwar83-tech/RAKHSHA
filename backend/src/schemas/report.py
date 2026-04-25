from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class ReportBase(BaseModel):
    type: str
    description: Optional[str] = None

class ReportCreate(ReportBase):
    lat: float
    lng: float

class ReportResponse(ReportBase):
    id: int
    media_url: Optional[str] = None
    created_at: datetime

    class Config:
        from_attributes = True

class HeatmapPoint(BaseModel):
    lat: float
    lng: float
    weight: float
    type: str
