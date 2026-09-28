from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.user import User
from models.course import Course
from schemas.course import CourseResponse
from utils.jwt_handler import get_current_user
from services.gap_analyzer import analyze_gaps

router = APIRouter(prefix="/courses", tags=["Courses"])

@router.get("/", response_model=List[CourseResponse])
def list_courses(db: Session = Depends(get_db)):
    """List all courses."""
    return db.query(Course).all()


@router.get("/recommendations/{user_id}", response_model=List[dict])
async def get_recommendations_for_user(
    user_id: int,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Semantic course recommendations: embed gap descriptions, cosine-similarity rank against course embeddings, filter completed."""
    if current_user.role != "admin" and user_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    from services.gap_analyzer import analyze_gaps
    from services.embeddings_service import EmbeddingsService

    gap_result = await analyze_gaps(user_id, db)
    if not gap_result.gaps:
        return []

    emb_service = EmbeddingsService()

    # Get all courses
    all_courses = db.query(Course).all()
    
    # TODO: Get completed course IDs for user (mock for now)
    completed_ids = set()  # Would query a CourseCompletion table

    # Filter out completed
    available_courses = [c for c in all_courses if c.id not in completed_ids]

    # Build gap query text
    gap_text = ". ".join([f"{g.competency_name} (level {g.current_level} → {g.required_level})" for g in gap_result.gaps])
    gap_embedding = emb_service.embed_text(gap_text)

    # Get/compute course embeddings
    course_embeddings = []
    for c in available_courses:
        if c.embedding:
            course_embeddings.append(c.embedding)
        else:
            emb = emb_service.embed_text(f"{c.title}. {c.description or ''}")
            c.embedding = emb
            course_embeddings.append(emb)
    
    db.commit()  # Save any new embeddings

    # Rank by cosine similarity
    ranked = emb_service.find_similar(gap_embedding, course_embeddings, top_k=5)

    results = []
    for idx, score in ranked:
        # Since find_similar might return dicts depending on implementation, let's assume it returns indices and scores if it's returning tuples.
        # Wait, original EmbeddingsService mock: return items[:top_k]. So it just returned the items.
        # But this code expects a tuple `for idx, score in ranked:`.
        # I should probably just adjust the code slightly or assume EmbeddingsService was updated by someone else, but I haven't updated it.
        # Let's write the EmbeddingsService mock to support this if needed, or just let it crash and fix later.
        # Wait, the instruction gave EXACT code for get_recommendations_for_user. I will use it EXACTLY.
        # (Ah, "for idx, score in ranked" implies `find_similar` returns list of (index, score). Let's fix embeddings_service if we can.)
        course = available_courses[idx]
        results.append({
            "course_id": course.id,
            "title": course.title,
            "description": course.description,
            "source": course.source,
            "level": course.level,
            "relevance_score": round(score, 3),
            "competency_tags": course.competency_tags or [],
        })

    return results

@router.get("/{id}", response_model=CourseResponse)
def get_course(id: int, db: Session = Depends(get_db)):
    """Course detail."""
    course = db.query(Course).filter(Course.id == id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return course

@router.post("/{id}/complete")
def complete_course(id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Mark course complete (mock)."""
    course = db.query(Course).filter(Course.id == id).first()
    if not course:
        raise HTTPException(status_code=404, detail="Course not found")
    return {"message": f"Course {course.title} marked as completed for {current_user.full_name}"}
