from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text

async def get_nearby_safe_havens(lat: float, lng: float, radius: int, db: Session):
    try:
        # radius is in meters
        query = text("""
            SELECT id, name, type, ST_X(location::geometry) as lng, ST_Y(location::geometry) as lat, 
                   address, contact_number,
                   ST_Distance(location, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography) as distance
            FROM safe_havens
            WHERE ST_DWithin(location::geography, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326)::geography, :radius)
            ORDER BY distance ASC
        """)
        
        result = db.execute(query, {"lng": lng, "lat": lat, "radius": radius})
        havens = []
        for r in result.fetchall():
            havens.append({
                "id": str(r.id),
                "name": r.name,
                "type": r.type,
                "location": {"longitude": r.lng, "latitude": r.lat},
                "address": r.address,
                "contact_number": r.contact_number,
                "distance": round(r.distance)
            })
            
        return havens
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

async def create_safe_haven(haven_data: dict, db: Session):
    try:
        query = text("""
            INSERT INTO safe_havens (name, type, location, address, contact_number)
            VALUES (:name, :type, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326), :address, :contact_number)
            RETURNING id;
        """)
        
        result = db.execute(query, {
            "name": haven_data['name'],
            "type": haven_data['type'],
            "lng": haven_data['location']['longitude'],
            "lat": haven_data['location']['latitude'],
            "address": haven_data.get('address', ''),
            "contact_number": haven_data.get('contact_number', '')
        })
        
        haven_id = result.fetchone()[0]
        db.commit()
        
        return {"success": True, "id": str(haven_id)}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
