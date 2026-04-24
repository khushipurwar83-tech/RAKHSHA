from fastapi import APIRouter, Depends, Request
from sqlalchemy.orm import Session
from src.config.database import get_db
from src.controllers.sosController import trigger_sos, cancel_sos
from src.middleware.auth import verify_token
from pydantic import BaseModel

router = APIRouter()

class LocationSchema(BaseModel):
    latitude: float
    longitude: float

class SOSRequest(BaseModel):
    location: LocationSchema
    audio_url: str = None

class SOSCancelRequest(BaseModel):
    sos_id: str

@router.post("/trigger")
async def trigger(request: Request, sos_data: SOSRequest, db: Session = Depends(get_db), user_id: str = Depends(verify_token)):
    # Retrieve the global sio instance attached to app if needed
    sio = request.app.state.sio if hasattr(request.app.state, 'sio') else None
    return await trigger_sos(user_id, sos_data.model_dump()['location'], db, sio)

@router.post("/cancel")
async def cancel(request: Request, sos_data: SOSCancelRequest, db: Session = Depends(get_db), user_id: str = Depends(verify_token)):
    sio = request.app.state.sio if hasattr(request.app.state, 'sio') else None
    return await cancel_sos(user_id, sos_data.sos_id, db, sio)
