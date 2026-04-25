from fastapi import APIRouter

router = APIRouter()

@router.post("/activate")
async def activate_health_mode():
    # Logs state change for stealth mode
    # Frontend handles the UI disguise (e.g. showing a Period Tracker)
    return {
        "status": "stealth_active",
        "mode": "HEALTH_TRACKER",
        "emergency_triggers_enabled": True
    }
