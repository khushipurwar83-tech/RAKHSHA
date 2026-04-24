from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.controllers.userController import get_user_profile, add_guardian, get_guardians, remove_guardian
from src.middleware.auth import verify_token
from pydantic import BaseModel

router = APIRouter()

class GuardianAddRequest(BaseModel):
    phone_number: str
    relationship: str

@router.get("/profile")
async def profile(db: Session = Depends(get_db), user_id: str = Depends(verify_token)):
    return await get_user_profile(user_id, db)

@router.get("/guardians")
async def guardians_list(db: Session = Depends(get_db), user_id: str = Depends(verify_token)):
    return await get_guardians(user_id, db)

@router.post("/guardians")
async def add_new_guardian(data: GuardianAddRequest, db: Session = Depends(get_db), user_id: str = Depends(verify_token)):
    return await add_guardian(user_id, data.phone_number, data.relationship, db)

@router.delete("/guardians/{link_id}")
async def delete_guardian(link_id: str, db: Session = Depends(get_db), user_id: str = Depends(verify_token)):
    return await remove_guardian(user_id, link_id, db)