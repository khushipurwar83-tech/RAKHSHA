from twilio.rest import Client
from src.core.config import settings

class SMSService:
    def __init__(self):
        self.client = Client(settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN)

    async def send_sms(self, to_phone: str, message: str):
        try:
            self.client.messages.create(
                body=message,
                from_=settings.TWILIO_PHONE_NUMBER,
                to=to_phone
            )
            return True
        except Exception as e:
            print(f"Twilio Error: {e}")
            return False

sms_service = SMSService()
