from sqlalchemy import Column, Integer, ForeignKey, Float, DateTime
from sqlalchemy.sql import func
from geoalchemy2 import Geography
from src.core.database import Base

class Route(Base):
    __tablename__ = "routes"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"))
    path = Column(Geography(geometry_type="LINESTRING", srid=4326))
    risk_score = Column(Float, default=0.0)
    created_at = Column(DateTime(timezone=True), server_default=func.now())
