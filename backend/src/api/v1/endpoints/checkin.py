from fastapi import APIRouter, Depends
from src.schemas.route import LatLng

router = APIRouter()

@router.post("/")
async def safety_checkin(location: LatLng, user_id: int):
    # Store check-in in Redis for quick access by guardians
    # In production: Send notification to emergency contacts
    return {
        "status": "checked_in",
        "location": location,
        "timestamp": "2024-04-25T17:28:00Z",
        "notified_contacts": 3
    }
