from pydantic import BaseModel
from typing import Optional, List, Any

class CourseBase(BaseModel):
    title: str
    description: Optional[str] = None
    provider: Optional[str] = None
    duration_hours: Optional[int] = None
    competency_tags: Optional[List[str]] = None
    difficulty_level: Optional[str] = None
    url: Optional[str] = None
    is_active: bool = True

class CourseCreate(CourseBase):
    igot_id: Optional[str] = None
    embedding: Optional[List[float]] = None

class CourseResponse(CourseBase):
    id: int
    igot_id: Optional[str] = None

    class Config:
        from_attributes = True
