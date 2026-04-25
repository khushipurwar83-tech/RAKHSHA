from pydantic import BaseModel
from typing import List, Optional

class WatchSyncRequest(BaseModel):
    user_id: int
    device_type: str # 'apple_watch' or 'wear_os'
    current_route_id: Optional[int] = None
    haptic_enabled: bool = True
