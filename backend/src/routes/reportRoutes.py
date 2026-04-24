from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.controllers.reportController import create_report, get_recent_reports
from src.middleware.auth import verify_token
from pydantic import BaseModel
from typing import Optional

router = APIRouter()

class LocationSchema(BaseModel):
    latitude: float
    longitude: float

class ReportCreateRequest(BaseModel):
    location: LocationSchema
    description: str
    severity: int
    photo_url: Optional[str] = None

@router.post("/")
async def submit_report(report_data: ReportCreateRequest, db: Session = Depends(get_db), user_id: str = Depends(verify_token)):
    return await create_report(user_id, report_data.model_dump(), db)

@router.get("/")
async def get_reports(limit: int = 10, db: Session = Depends(get_db)):
    return await get_recent_reports(db, limit)