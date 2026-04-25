import firebase_admin
from firebase_admin import credentials, messaging
from src.core.config import settings

class NotificationService:
    def __init__(self):
        try:
            cred = credentials.Certificate(settings.FIREBASE_CREDENTIALS_PATH)
            firebase_admin.initialize_app(cred)
        except Exception as e:
            print(f"Firebase Init Error: {e}")

    async def send_push(self, token: str, title: str, body: str, data: dict = None):
        message = messaging.Message(
            notification=messaging.Notification(
                title=title,
                body=body,
            ),
            data=data,
            token=token,
        )
        try:
            response = messaging.send(message)
            return response
        except Exception as e:
            print(f"FCM Send Error: {e}")
            return None

notification_service = NotificationService()
