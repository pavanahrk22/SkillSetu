from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.user import User
from models.competency import Competency, UserCompetency
from schemas.competency import CompetencyResponse, UserCompetencyCreate, UserCompetencyResponse, SkillGapResponse
from utils.jwt_handler import get_current_user
from services.gap_analyzer import analyze_gaps

router = APIRouter(prefix="/competencies", tags=["Competencies"])

@router.get("/", response_model=List[CompetencyResponse])
def list_competencies(domain: str = None, db: Session = Depends(get_db)):
    """List all competencies, optionally filtered by domain."""
    q = db.query(Competency)
    if domain:
        q = q.filter(Competency.domain == domain)
    return q.all()

@router.get("/profile", response_model=List[UserCompetencyResponse])
def get_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return db.query(UserCompetency).filter(UserCompetency.user_id == current_user.id).all()

@router.post("/self-assess", response_model=List[UserCompetencyResponse])
def self_assess(data: List[UserCompetencyCreate], current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    results = []
    for item in data:
        existing = db.query(UserCompetency).filter(
            UserCompetency.user_id == current_user.id,
            UserCompetency.competency_id == item.competency_id
        ).first()
        if existing:
            existing.current_level = item.current_level
            results.append(existing)
        else:
            uc = UserCompetency(user_id=current_user.id, competency_id=item.competency_id, current_level=item.current_level)
            db.add(uc)
            results.append(uc)
    db.commit()
    for r in results:
        db.refresh(r)
    return results

@router.get("/gaps", response_model=SkillGapResponse)
async def get_gaps(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    return await analyze_gaps(current_user.id, db)
