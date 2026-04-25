from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from datetime import datetime

async def create_report(user_id: str, report_data: dict, db: Session):
    try:
        query = text("""
            INSERT INTO user_reports (user_id, location, description, severity, report_time)
            VALUES (:user_id, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326), :description, :severity, :report_time)
            RETURNING id;
        """)
        
        result = db.execute(query, {
            "user_id": user_id,
            "lng": report_data['location']['longitude'],
            "lat": report_data['location']['latitude'],
            "description": report_data.get('description', ''),
            "severity": report_data.get('severity', 3),
            "report_time": datetime.utcnow()
        })
        
        report_id = result.fetchone()[0]
        db.commit()
        
        return {"success": True, "report_id": str(report_id), "message": "Report submitted successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

async def get_recent_reports(db: Session, limit: int = 10):
    try:
        query = text("""
            SELECT id, user_id, ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat, 
                   description, severity, report_time
            FROM user_reports
            ORDER BY report_time DESC
            LIMIT :limit
        """)
        
        result = db.execute(query, {"limit": limit})
        reports = []
        for r in result.fetchall():
            reports.append({
                "id": str(r.id),
                "user_id": str(r.user_id),
                "location": {"longitude": r.lng, "latitude": r.lat},
                "description": r.description,
                "severity": r.severity,
                "report_time": r.report_time
            })
            
        return {"reports": reports}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
