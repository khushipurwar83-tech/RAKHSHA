from pydantic import BaseModel
from typing import List, Dict, Optional

class SOSTrigger(BaseModel):
    user_id: int
    user_name: str
    lat: float
    lng: float
    contacts: List[Dict[str, str]] # List of {name, phone}
    user_fcm_token: str
    audio_snippet_url: Optional[str] = None
    image_url: Optional[str] = None
