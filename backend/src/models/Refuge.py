from sqlalchemy import Column, String, Boolean
from sqlalchemy.dialects.postgresql import UUID
import uuid
from src.config.database import Base

class Refuge(Base):
    __tablename__ = "safe_havens"
    id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255))
    type = Column(String(100))
    address = Column(String(500))
    is_verified = Column(Boolean, default=True)
