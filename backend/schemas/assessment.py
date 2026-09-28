from pydantic import BaseModel
from typing import Optional, List, Any
from datetime import datetime

class QuestionBase(BaseModel):
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    correct_option: str
    explanation: Optional[str] = None
    difficulty: Optional[str] = None
    competency_id: Optional[int] = None

class QuestionCreate(QuestionBase):
    assessment_id: int

class QuestionResponse(QuestionBase):
    id: int
    assessment_id: int

    class Config:
        from_attributes = True

class AssessmentBase(BaseModel):
    title: str
    course_id: Optional[int] = None

class AssessmentCreate(AssessmentBase):
    pass

class AssessmentResponse(AssessmentBase):
    id: int
    created_by: Optional[int] = None
    created_at: datetime
    questions: Optional[List[QuestionResponse]] = []

    class Config:
        from_attributes = True

class QuestionPublic(BaseModel):
    id: int
    assessment_id: int
    question_text: str
    option_a: str
    option_b: str
    option_c: str
    option_d: str
    difficulty: Optional[str] = None
    competency_id: Optional[int] = None

    class Config:
        from_attributes = True

class AssessmentPublic(AssessmentBase):
    id: int
    created_by: Optional[int] = None
    created_at: datetime
    questions: Optional[List[QuestionPublic]] = []

    class Config:
        from_attributes = True

class AssessmentSubmit(BaseModel):
    answers: dict[int, str] # question_id -> selected_option

class AssessmentResultResponse(BaseModel):
    id: int
    user_id: int
    assessment_id: int
    score: int
    total_questions: int
    completed_at: datetime
    answers_json: Any

    class Config:
        from_attributes = True
