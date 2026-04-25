import os
from typing import List, Union
from pydantic_settings import BaseSettings, SettingsConfigDict
from pydantic import AnyHttpUrl, validator

class Settings(BaseSettings):
    PROJECT_NAME: str = "RAKHSHA"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    SECRET_KEY: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 8  # 8 days

    # CORS
    BACKEND_CORS_ORIGINS: List[str] = ["*"]

    # Database
    DATABASE_URL: str
    
    # Redis
    REDIS_URL: str

    # External Services
    TWILIO_ACCOUNT_SID: str = ""
    TWILIO_AUTH_TOKEN: str = ""
    TWILIO_PHONE_NUMBER: str = ""
    
    CLOUDINARY_URL: str = ""
    
    FIREBASE_CREDENTIALS_PATH: str = "firebase-sdk.json"

    ENVIRONMENT: str = "production"
    DEBUG: bool = False

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")

settings = Settings()
