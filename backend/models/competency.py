from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship
from database import Base

class Competency(Base):
    __tablename__ = "competencies"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False, unique=True)
    domain = Column(String, nullable=False)  # statistical, technical, digital_governance, behavioural
    description = Column(String, nullable=True)
    level = Column(Integer, default=5)  # max level for this competency

class UserCompetency(Base):
    __tablename__ = "user_competencies"
    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    competency_id = Column(Integer, ForeignKey("competencies.id"), nullable=False)
    current_level = Column(Integer, default=0)  # 0-5
    user = relationship("User", back_populates="competencies")
    competency = relationship("Competency")
