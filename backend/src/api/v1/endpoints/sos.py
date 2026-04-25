from fastapi import APIRouter, Depends
from src.services.sms import sms_service
from src.services.notifications import notification_service
from src.schemas.sos import SOSTrigger

router = APIRouter()

@router.post("/trigger")
async def trigger_sos(sos: SOSTrigger):
    # 1. Send SMS to emergency contacts
    for contact in sos.contacts:
        await sms_service.send_sms(
            contact["phone"], 
            f"EMERGENCY: {sos.user_name} needs help! Live Location: https://maps.google.com/?q={sos.lat},{sos.lng}"
        )
    
    # 2. Send Push Notifications
    await notification_service.send_push(
        sos.user_fcm_token, 
        "SOS Triggered", 
        "Emergency contacts have been notified."
    )
    
    return {"status": "success", "message": "SOS alerts sent"}

@router.post("/fake-call")
async def fake_call():
    return {
        "caller_name": "Mom",
        "caller_number": "+1234567890",
        "delay_seconds": 30
    }
