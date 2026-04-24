from sqlalchemy import Column, String
from src.config.database import Base
class OTP(Base):
    __tablename__ = 'otps'
    id = Column(String, primary_key=True)