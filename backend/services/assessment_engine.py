async def generate_assessment_from_document(file_bytes: bytes, filename: str, num_questions: int, llm_service) -> dict:
    """Extract text from PDF/PPT, generate MCQs using LLM.
    Returns {title, questions: [...]}"""
    # Mock text extraction from file
    extracted_text = f"Extracted content from {filename}..."
    
    # Call LLM service to generate questions
    questions = await llm_service.generate_mcqs(
        content=extracted_text, 
        num_questions=num_questions, 
        difficulty="medium"
    )
    
    return {
        "title": f"Assessment on {filename}",
        "questions": questions
    }

async def score_assessment(submitted_answers: list[dict], correct_answers: list[dict]) -> dict:
    """Score assessment, generate per-question feedback.
    Returns {score, total, percentage, per_question: [{correct, explanation}]}"""
    
    correct_count = 0
    feedback = []
    
    for sub, cor in zip(submitted_answers, correct_answers):
        is_correct = sub.get("answer") == cor.get("correct_answer")
        if is_correct:
            correct_count += 1
            
        feedback.append({
            "question": cor.get("question"),
            "correct": is_correct,
            "explanation": cor.get("explanation")
        })
        
    total = len(correct_answers)
    percentage = (correct_count / total * 100) if total > 0 else 0
    
    return {
        "score": correct_count,
        "total": total,
        "percentage": percentage,
        "per_question": feedback
    }

async def update_competency_from_assessment(user_id: int, assessment_result: dict, db) -> list[dict]:
    """After assessment, update user's competency levels based on score.
    Returns updated competency entries."""
    
    # Mock update process
    score = assessment_result.get("percentage", 0)
    
    # Simulate competency bump if score > 80%
    new_level = 3 if score > 80 else 2
    
    updated_competencies = [
        {"competency_id": "DIG-001", "new_level": new_level}
    ]
    
    return updated_competencies
