from fastapi import APIRouter, Depends
from src.schemas.watch import WatchSyncRequest

router = APIRouter()

@router.post("/sync")
async def sync_to_watch(sync_data: WatchSyncRequest):
    # Logic to push data to Wear OS / Apple Watch via FCM or direct WebSocket
    return {
        "status": "synced",
        "device": sync_data.device_type,
        "features_enabled": ["haptic_alerts", "route_preview"]
    }

@router.post("/alert")
async def send_watch_alert(user_id: int):
    # Trigger haptic feedback on wearable
    return {"status": "alert_sent", "target_user": user_id}
