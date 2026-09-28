
async def generate_learning_path(recommendations: list[dict], gaps: list[dict]) -> list[dict]:
    """Order recommendations into a structured learning path.
    Consider prerequisites, difficulty progression, time constraints."""
    path = []
    
    # Mock ordering logic
    for i, rec in enumerate(recommendations):
        path.append({
            "step": i + 1,
            "course_id": rec["course_id"],
            "title": rec["title"],
            "description": f"Recommended to address your gaps in: {', '.join(rec['addresses_gaps'])}"
        })
        
    return path
