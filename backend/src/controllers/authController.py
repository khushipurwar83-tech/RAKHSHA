from fastapi import HTTPException, status
from sqlalchemy.orm import Session
from passlib.context import CryptContext
from src.models.User import User
import jwt
import os
from datetime import datetime, timedelta

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your_super_secret_jwt_key_here")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

def create_access_token(data: dict, expires_delta: timedelta | None = None):
    to_encode = data.copy()
    if expires_delta:
        expire = datetime.utcnow() + expires_delta
    else:
        expire = datetime.utcnow() + timedelta(minutes=43200) # 30 days default
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

async def register_user(user_data: dict, db: Session):
    # Check if user exists
    existing_user = db.query(User).filter(
        (User.email == user_data['email']) | (User.phone_number == user_data['phone_number'])
    ).first()
    
    if existing_user:
        raise HTTPException(status_code=400, detail="Email or phone number already registered")

    # Hash password
    hashed_password = pwd_context.hash(user_data['password'])
    hashed_pin = pwd_context.hash(user_data['emergency_pin']) if 'emergency_pin' in user_data else None

    new_user = User(
        full_name=user_data['full_name'],
        email=user_data['email'],
        phone_number=user_data['phone_number'],
        password_hash=hashed_password,
        emergency_pin=hashed_pin
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    # Generate token
    access_token = create_access_token(data={"sub": str(new_user.id)})

    return {
        "user": {
            "id": str(new_user.id),
            "full_name": new_user.full_name,
            "email": new_user.email,
            "phone_number": new_user.phone_number
        },
        "access_token": access_token,
        "token_type": "bearer"
    }

async def login_user(credentials: dict, db: Session):
    user = db.query(User).filter(User.email == credentials['email']).first()
    if not user:
        raise HTTPException(status_code=401, detail="Invalid credentials")

    if not pwd_context.verify(credentials['password'], user.password_hash):
        raise HTTPException(status_code=401, detail="Invalid credentials")

    access_token = create_access_token(data={"sub": str(user.id)})

    return {
        "user": {
            "id": str(user.id),
            "full_name": user.full_name,
            "email": user.email,
            "phone_number": user.phone_number
        },
        "access_token": access_token,
        "token_type": "bearer"
    }
