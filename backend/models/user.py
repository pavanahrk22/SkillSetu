from sqlalchemy import Column, Integer, String, ForeignKey, DateTime
from sqlalchemy.sql import func
from sqlalchemy.orm import relationship
from database import Base

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    full_name = Column(String, nullable=False)
    hashed_password = Column(String, nullable=False)
    role = Column(String, default="learner") # learner, admin, trainer
    designation = Column(String, nullable=True)
    department = Column(String, nullable=True)
    experience_years = Column(Integer, nullable=True)
    created_at = Column(DateTime(timezone=True), server_default=func.now())

    past_trainings = relationship("PastTraining", back_populates="user")
    competencies = relationship("UserCompetency", back_populates="user")

class PastTraining(Base):
    __tablename__ = "past_trainings"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    training_name = Column(String, nullable=False)
    provider = Column(String, nullable=True)
    completion_date = Column(DateTime(timezone=True), nullable=True)
    certificate_url = Column(String, nullable=True)

    user = relationship("User", back_populates="past_trainings")
