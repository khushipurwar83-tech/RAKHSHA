from fastapi import APIRouter, Depends, Header, HTTPException
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.controllers.watchController import create_pairing_code, pair_users
from pydantic import BaseModel

router = APIRouter()

class PairRequest(BaseModel):
    code: str

@router.post("/generate-code")
async def get_code(user_id: str = Header(...), db: Session = Depends(get_db)):
    return await create_pairing_code(user_id, db)

@router.post("/pair")
async def pairing(data: PairRequest, user_id: str = Header(...), db: Session = Depends(get_db)):
    return await pair_users(user_id, data.code, db)