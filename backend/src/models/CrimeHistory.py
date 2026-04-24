from sqlalchemy import Column, String
from src.config.database import Base
class CrimeHistory(Base):
    __tablename__ = 'crime_history'
    id = Column(String, primary_key=True)