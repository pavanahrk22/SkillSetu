from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime

class UserBase(BaseModel):
    email: EmailStr
    full_name: str
    designation: Optional[str] = None
    department: Optional[str] = None
    experience_years: Optional[int] = None

class UserCreate(UserBase):
    password: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class UserUpdate(BaseModel):
    designation: Optional[str] = None
    department: Optional[str] = None
    experience_years: Optional[int] = None

class UserResponse(UserBase):
    id: int
    role: str
    created_at: datetime

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str

class PastTrainingCreate(BaseModel):
    training_name: str
    provider: Optional[str] = None
    completion_date: Optional[datetime] = None
    certificate_url: Optional[str] = None

class PastTrainingResponse(PastTrainingCreate):
    id: int
    user_id: int

    class Config:
        from_attributes = True
