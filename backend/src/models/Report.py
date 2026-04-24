from sqlalchemy import Column, String, Text, Float, DateTime, ForeignKey, Integer
from sqlalchemy.dialects.postgresql import UUID
import uuid
from src.config.database import Base

class Report(Base):
    __tablename__ = "user_reports"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    user_id = Column(UUID(as_uuid=True), ForeignKey('users.id'))
    description = Column(Text)
    photo_url = Column(String(500))
    severity = Column(Integer)
