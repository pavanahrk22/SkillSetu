from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from database import get_db
from models.user import User
from utils.jwt_handler import role_required

router = APIRouter(prefix="/admin", tags=["Admin"])

@router.get("/workforce/heatmap")
def get_workforce_heatmap(current_user: User = Depends(role_required("admin")), db: Session = Depends(get_db)):
    """Aggregated competency data across all users."""
    return {"message": "Workforce heatmap data (mocked)"}

@router.get("/training/effectiveness")
def get_training_effectiveness(current_user: User = Depends(role_required("admin")), db: Session = Depends(get_db)):
    """Training completion rates, score improvements."""
    return {"message": "Training effectiveness data (mocked)"}

@router.get("/users")
def get_all_users(current_user: User = Depends(role_required("admin")), db: Session = Depends(get_db)):
    """List all users with competency summaries."""
    users = db.query(User).all()
    return [{"id": u.id, "email": u.email, "full_name": u.full_name, "role": u.role} for u in users]

@router.get("/analytics")
def get_analytics(current_user: User = Depends(role_required("admin")), db: Session = Depends(get_db)):
    """Overall platform stats."""
    return {"total_users": db.query(User).count()}
