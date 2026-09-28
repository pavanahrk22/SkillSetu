from pydantic import BaseModel
from typing import Optional, List

class CompetencyResponse(BaseModel):
    id: int
    name: str
    domain: str
    description: Optional[str] = None
    level: int
    class Config:
        from_attributes = True

class UserCompetencyCreate(BaseModel):
    competency_id: int
    current_level: int

class UserCompetencyResponse(BaseModel):
    id: int
    user_id: int
    competency_id: int
    current_level: int
    class Config:
        from_attributes = True

class SkillGapItem(BaseModel):
    competency_id: int
    competency_name: str
    domain: str
    current_level: int
    required_level: int
    gap: int
    severity: str  # "critical", "high", "medium", "low"

class SkillGapResponse(BaseModel):
    user_id: int
    designation: str
    total_gaps: int
    gaps: List[SkillGapItem]
