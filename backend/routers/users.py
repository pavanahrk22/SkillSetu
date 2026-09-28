from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.user import User, PastTraining
from models.competency import UserCompetency, Competency
from schemas.user import UserResponse, UserUpdate, PastTrainingCreate, PastTrainingResponse
from utils.jwt_handler import get_current_user
from utils.pdf_parser import extract_text_from_pdf
from services.competency_engine import extract_competencies_from_profile

router = APIRouter(prefix="/users", tags=["Users"])

@router.get("/profile", response_model=dict)
def get_profile(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get full profile with competencies."""
    competencies = db.query(UserCompetency).filter(UserCompetency.user_id == current_user.id).all()
    return {
        "user": UserResponse.from_orm(current_user),
        "competencies": competencies
    }

@router.put("/profile", response_model=UserResponse)
def update_profile(profile_data: UserUpdate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Update profile."""
    if profile_data.designation is not None:
        current_user.designation = profile_data.designation
    if profile_data.department is not None:
        current_user.department = profile_data.department
    if profile_data.experience_years is not None:
        current_user.experience_years = profile_data.experience_years
    db.commit()
    db.refresh(current_user)
    return current_user

@router.post("/profile/upload")
async def upload_profile_document(file: UploadFile = File(...), current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Upload profile document (PDF) and extract competencies via NLP."""
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    contents = await file.read()
    text = extract_text_from_pdf(contents)
<<<<<<< HEAD
    
    # Query all Competency rows and serialize to dicts
    all_competencies = db.query(Competency).all()
    taxonomy = [{"id": c.id, "name": c.name, "domain": c.domain, "description": c.description, "level": c.level} for c in all_competencies]
    
=======
    taxonomy = [{"id": c.id, "name": c.name, "domain": c.domain} for c in db.query(Competency).all()]
>>>>>>> 6036b12 (Add taxonomy, admin seed, LLM settings and security fixes (A2-A5))
    extracted = await extract_competencies_from_profile(text, taxonomy)
    
    return {"message": "Extracted competencies from document", "extracted": extracted}

@router.get("/trainings", response_model=List[PastTrainingResponse])
def get_trainings(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """List past trainings."""
    trainings = db.query(PastTraining).filter(PastTraining.user_id == current_user.id).all()
    return trainings

@router.post("/trainings", response_model=PastTrainingResponse)
def add_training(training_data: PastTrainingCreate, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Add past training."""
    new_training = PastTraining(
        user_id=current_user.id,
        **training_data.dict()
    )
    db.add(new_training)
    db.commit()
    db.refresh(new_training)
    return new_training
