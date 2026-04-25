from sqlalchemy import Column, Integer, String, Float, DateTime
from sqlalchemy.sql import func
from geoalchemy2 import Geography
from src.core.database import Base

class CrimeHistory(Base):
    __tablename__ = "crime_history"

    id = Column(Integer, primary_key=True, index=True)
    location = Column(Geography(geometry_type="POINT", srid=4326))
    crime_type = Column(String)
    severity = Column(Integer) # 1-10
    timestamp = Column(DateTime(timezone=True), server_default=func.now())
