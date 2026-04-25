from fastapi import Header, HTTPException, Depends
from jose import jwt, JWTError
from src.core.config import settings
from src.core.security import ALGORITHM

async def get_current_user(token: str = Header(...)):
    credentials_exception = HTTPException(
        status_code=401,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
        return int(user_id)
    except JWTError:
        raise credentials_exception
