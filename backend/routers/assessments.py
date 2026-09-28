from fastapi import APIRouter, Depends, HTTPException, UploadFile, File
from sqlalchemy.orm import Session
from typing import List
from database import get_db
from models.user import User
from models.assessment import Assessment, Question, AssessmentResult
from schemas.assessment import AssessmentSubmit, AssessmentResultResponse, AssessmentPublic
from utils.jwt_handler import get_current_user
from utils.pdf_parser import extract_text_from_pdf, extract_text_from_pptx

router = APIRouter(prefix="/assessments", tags=["Assessments"])

@router.get("/", response_model=List[AssessmentPublic])
def list_assessments(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """List assessments."""
    return db.query(Assessment).all()

@router.get("/{id}", response_model=AssessmentPublic)
def get_assessment(id: int, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Get assessment with questions."""
    assessment = db.query(Assessment).filter(Assessment.id == id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    return assessment

@router.post("/{id}/submit", response_model=AssessmentResultResponse)
def submit_assessment(id: int, submit_data: AssessmentSubmit, current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """Submit answers -> score + explanations + update competency."""
    assessment = db.query(Assessment).filter(Assessment.id == id).first()
    if not assessment:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    questions = {q.id: q for q in db.query(Question).filter(Question.assessment_id == id).all()}
    
    score = 0
    total = len(questions)
    
    for q_id, ans in submit_data.answers.items():
        q = questions.get(q_id)
        if q and q.correct_option == ans:
            score += 1
            
    result = AssessmentResult(
        user_id=current_user.id,
        assessment_id=id,
        score=score,
        total_questions=total,
        answers_json=submit_data.answers
    )
    db.add(result)
    db.commit()
    db.refresh(result)
    return result

@router.get("/user/results", response_model=List[AssessmentResultResponse])
def get_user_results(current_user: User = Depends(get_current_user), db: Session = Depends(get_db)):
    """User's assessment history."""
    return db.query(AssessmentResult).filter(AssessmentResult.user_id == current_user.id).all()

@router.post("/generate-quiz")
async def generate_quiz(
    file: UploadFile = File(...),
    num_questions: int = 5,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Upload PDF → extract text → Claude API generates MCQs as valid JSON → store and return."""
    contents = await file.read()
    
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Only PDF files are supported")
    
    text = extract_text_from_pdf(contents)
    if not text.strip():
        raise HTTPException(status_code=400, detail="Could not extract text from PDF")
    
    # Chunk if too long (Claude context limit)
    max_chars = 12000
    if len(text) > max_chars:
        text = text[:max_chars]
    
    from services.llm_service import LLMService
    llm = LLMService()
    mcqs = await llm.generate_mcqs_from_content(text, num_questions)
    
    # Store in DB
    assessment = Assessment(
        title=f"Quiz from {file.filename}",
        created_by=current_user.id
    )
    db.add(assessment)
    db.commit()
    db.refresh(assessment)
    
    stored_questions = []
    for i, mcq in enumerate(mcqs):
        q = Question(
            assessment_id=assessment.id,
            question_text=mcq["question"],
            option_a=mcq["options"][0],
            option_b=mcq["options"][1],
            option_c=mcq["options"][2],
            option_d=mcq["options"][3],
            correct_option=["A", "B", "C", "D"][mcq["correct_answer_index"]],
            explanation=mcq.get("explanation", ""),
            difficulty="medium"
        )
        db.add(q)
        stored_questions.append(q)
    
    db.commit()
    for q in stored_questions:
        db.refresh(q)
    
    return {
        "assessment_id": assessment.id,
        "title": assessment.title,
        "num_questions": len(stored_questions),
        "questions": [
            {
                "id": q.id,
                "question": q.question_text,
                "options": [q.option_a, q.option_b, q.option_c, q.option_d],
            }
            for q in stored_questions
        ]
    }

@router.post("/submit-quiz")
def submit_quiz(
    assessment_id: int,
    answers: dict,  # {question_id: "A"/"B"/"C"/"D"}
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Score answers, return per-question feedback with explanations."""
    questions = db.query(Question).filter(Question.assessment_id == assessment_id).all()
    if not questions:
        raise HTTPException(status_code=404, detail="Assessment not found")
    
    results = []
    score = 0
    for q in questions:
        user_answer = answers.get(str(q.id))
        is_correct = user_answer == q.correct_option
        if is_correct:
            score += 1
        results.append({
            "question_id": q.id,
            "question": q.question_text,
            "your_answer": user_answer,
            "correct_answer": q.correct_option,
            "is_correct": is_correct,
            "explanation": q.explanation,
        })
    
    # Store result
    result = AssessmentResult(
        user_id=current_user.id,
        assessment_id=assessment_id,
        score=score,
        total_questions=len(questions),
        answers_json=answers
    )
    db.add(result)
    db.commit()
    
    return {
        "assessment_id": assessment_id,
        "score": score,
        "total": len(questions),
        "percentage": round(score / len(questions) * 100, 1),
        "feedback": results,
    }
