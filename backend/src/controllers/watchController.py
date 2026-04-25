from fastapi import HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import text
import uuid

async def create_pairing_code(user_id: str, db: Session):
    try:
        # Generate a unique 6-digit code for pairing
        code = str(uuid.uuid4().int)[:6]
        # Store in redis or db with expiry (simulated here in DB for simplicity)
        query = text("""
            UPDATE users SET pairing_code = :code, pairing_expiry = NOW() + INTERVAL '10 minutes'
            WHERE id = :user_id
        """)
        db.execute(query, {"code": code, "user_id": user_id})
        db.commit()
        return {"pairing_code": code}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))

async def pair_users(requester_id: str, code: str, db: Session):
    try:
        # Find user with this code
        query = text("SELECT id FROM users WHERE pairing_code = :code AND pairing_expiry > NOW()")
        target = db.execute(query, {"code": code}).fetchone()
        
        if not target:
            raise HTTPException(status_code=404, detail="Invalid or expired pairing code")
        
        target_id = target[0]
        if target_id == requester_id:
            raise HTTPException(status_code=400, detail="Cannot pair with yourself")

        # Create bidirectional watch relationship
        watch_query = text("""
            INSERT INTO user_watches (watcher_id, watched_id, status)
            VALUES (:r_id, :t_id, 'active'), (:t_id, :r_id, 'active')
            ON CONFLICT DO NOTHING
        """)
        db.execute(watch_query, {"r_id": requester_id, "t_id": target_id})
        db.commit()
        
        return {"success": True, "paired_with": str(target_id)}
    except Exception as e:
        db.rollback()
        raise HTTPException(status_code=500, detail=str(e))