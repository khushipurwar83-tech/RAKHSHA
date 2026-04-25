from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from typing import List, Optional
from src.core.database import get_db
from src.models.report import Report
from src.schemas.report import ReportCreate, ReportResponse, HeatmapPoint

router = APIRouter()

@router.post("/", response_model=ReportResponse)
async def create_report(
    type: str = Form(...),
    lat: float = Form(...),
    lng: float = Form(...),
    description: Optional[str] = Form(None),
    media: Optional[UploadFile] = File(None),
    db: AsyncSession = Depends(get_db)
):
    # In production: Upload 'media' to Cloudinary/S3 and get URL
    media_url = None
    if media:
        # Placeholder for upload logic
        media_url = f"https://storage.rakhsha.app/reports/{media.filename}"

    # Create spatial point
    point = f"POINT({lng} {lat})"
    
    db_report = Report(
        type=type,
        location=point,
        description=description,
        media_url=media_url
    )
    db.add(db_report)
    await db.commit()
    await db.refresh(db_report)
    return db_report

@router.get("/heatmap", response_model=List[HeatmapPoint])
async def get_report_heatmap(db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Report))
    reports = result.scalars().all()
    
    # In production: Use PostGIS ST_AsGeoJSON or aggregation for performance
    return [
        {
            "lat": 28.6139, # Placeholder logic to extract from WKB
            "lng": 77.2090, 
            "weight": 1.0,
            "type": r.type
        } for r in reports
    ]
