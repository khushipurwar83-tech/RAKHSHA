from fastapi import HTTPException
from sqlalchemy.orm import Session
from src.models.User import User, Guardian
import uuid

async def get_user_profile(user_id: str, db: Session):
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    return {
        "id": str(user.id),
        "full_name": user.full_name,
        "email": user.email,
        "phone_number": user.phone_number,
        "is_verified": user.is_verified
    }

async def add_guardian(user_id: str, guardian_phone: str, relationship: str, db: Session):
    # Find the guardian user by phone number
    guardian_user = db.query(User).filter(User.phone_number == guardian_phone).first()
    if not guardian_user:
        raise HTTPException(status_code=404, detail="Guardian with this phone number not found in Rakhsha system")
    
    if str(guardian_user.id) == user_id:
        raise HTTPException(status_code=400, detail="You cannot be your own guardian")

    # Check if already added
    existing = db.query(Guardian).filter(
        Guardian.user_id == user_id, 
        Guardian.guardian_id == guardian_user.id
    ).first()
    
    if existing:
        return {"success": True, "message": "Guardian already added"}

    new_guardian = Guardian(
        user_id=uuid.UUID(user_id),
        guardian_id=guardian_user.id,
        relationship=relationship
    )
    
    db.add(new_guardian)
    db.commit()
    
    return {"success": True, "message": f"{guardian_user.full_name} added as guardian"}

async def get_guardians(user_id: str, db: Session):
    # Join with User table to get guardian names and phones
    guardians = db.query(Guardian, User).join(
        User, Guardian.guardian_id == User.id
    ).filter(Guardian.user_id == user_id).all()
    
    result = []
    for g, u in guardians:
        result.append({
            "id": str(g.id),
            "guardian_id": str(u.id),
            "full_name": u.full_name,
            "phone_number": u.phone_number,
            "relationship": g.relationship,
            "is_active": g.is_active
        })
    
    return result

async def remove_guardian(user_id: str, guardian_link_id: str, db: Session):
    guardian = db.query(Guardian).filter(
        Guardian.id == guardian_link_id, 
        Guardian.user_id == user_id
    ).first()
    
    if not guardian:
        raise HTTPException(status_code=404, detail="Guardian link not found")
    
    db.delete(guardian)
    db.commit()
    
    return {"success": True, "message": "Guardian removed"}
