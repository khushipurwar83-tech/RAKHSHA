import os
from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
from src.models.User import Guardian

# Supabase real-time or Socket.io can be used to emit events.
# Here we'll rely on the socketio server in app.py or database triggers.

async def trigger_sos(user_id: str, location: dict, db: Session, sio_server=None):
    try:
        # Insert SOS event using raw SQL with PostGIS
        query = text("""
            INSERT INTO sos_events (user_id, location, is_active)
            VALUES (:user_id, ST_SetSRID(ST_MakePoint(:lng, :lat), 4326), true)
            RETURNING id;
        """)
        
        result = db.execute(query, {
            "user_id": user_id,
            "lng": location['longitude'],
            "lat": location['latitude']
        })
        sos_id = result.fetchone()[0]
        db.commit()

        # Fetch Guardians to notify
        guardians = db.query(Guardian).filter(Guardian.user_id == user_id, Guardian.is_active == True).all()
        guardian_ids = [str(g.guardian_id) for g in guardians]

        # In a real app, send SMS via Twilio here
        # send_sms_alerts(guardian_ids)

        # Emit WebSocket event if server instance passed
        if sio_server:
            await sio_server.emit('sos_alert', {
                "sos_id": str(sos_id),
                "user_id": user_id,
                "location": location,
                "timestamp": "now"
            }, room="police_dashboard")
            
            for gid in guardian_ids:
                await sio_server.emit('sos_alert', {
                    "sos_id": str(sos_id),
                    "user_id": user_id,
                    "location": location
                }, room=f"user_{gid}")

        return {"success": True, "sos_id": str(sos_id), "message": "SOS Triggered Successfully"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

async def cancel_sos(user_id: str, sos_id: str, db: Session, sio_server=None):
    try:
        query = text("""
            UPDATE sos_events 
            SET is_active = false, resolved_at = NOW() 
            WHERE id = :sos_id AND user_id = :user_id
            RETURNING id;
        """)
        result = db.execute(query, {"sos_id": sos_id, "user_id": user_id})
        updated = result.fetchone()
        
        if not updated:
            raise HTTPException(status_code=404, detail="Active SOS event not found")
            
        db.commit()

        if sio_server:
            await sio_server.emit('sos_cancelled', {
                "sos_id": sos_id,
                "user_id": user_id
            })

        return {"success": True, "message": "SOS Cancelled"}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))
