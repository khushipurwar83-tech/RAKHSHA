from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.controllers.authController import register_user, login_user
from pydantic import BaseModel, EmailStr

router = APIRouter()

class RegisterRequest(BaseModel):
    full_name: str
    email: EmailStr
    phone_number: str
    password: str
    emergency_pin: str = None

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

@router.post("/register")
async def register(request: RegisterRequest, db: Session = Depends(get_db)):
    return await register_user(request.dict(), db)

@router.post("/login")
async def login(request: LoginRequest, db: Session = Depends(get_db)):
    return await login_user(request.dict(), db)
