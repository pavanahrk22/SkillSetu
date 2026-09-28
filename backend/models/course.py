from sqlalchemy import Column, Integer, String, Boolean, JSON
from database import Base

class Course(Base):
    __tablename__ = "courses"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    competency_tags = Column(JSON, nullable=True)  # list of competency names
    level = Column(String, nullable=True)  # beginner/intermediate/advanced
    source = Column(String, default="iGOT")  # iGOT or TPAC
    provider = Column(String, nullable=True)
    duration_hours = Column(Integer, nullable=True)
    url = Column(String, nullable=True)
    embedding = Column(JSON, nullable=True)  # cached embedding vector
    is_active = Column(Boolean, default=True) # Keeping this from original since it's used in router
