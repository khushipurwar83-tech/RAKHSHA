from fastapi import Request, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
import jwt
import os

security = HTTPBearer()
SECRET_KEY = os.getenv("JWT_SECRET_KEY", "your_super_secret_jwt_key_here")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security) if 'Depends' in globals() else None):
    if credentials is None:
        raise HTTPException(status_code=403, detail="Invalid authorization code.")
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Could not validate credentials")
        return user_id
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Could not validate credentials")

# Fix for Depends
from fastapi import Depends
async def verify_token(credentials: HTTPAuthorizationCredentials = Depends(security)):
    return await get_current_user(credentials)
