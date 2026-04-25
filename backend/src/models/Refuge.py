from sqlalchemy import Column, Integer, String, DateTime
from sqlalchemy.sql import func
from geoalchemy2 import Geography
from src.core.database import Base

class Refuge(Base):
    __tablename__ = "refuges"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    type = Column(String) # police, hospital, cafe, open_shop
    location = Column(Geography(geometry_type="POINT", srid=4326))
    hours = Column(String) # e.g. "24/7" or "09:00-21:00"
    created_at = Column(DateTime(timezone=True), server_default=func.now())
