async def recommend_courses(gaps: list[dict], courses: list[dict], embeddings_service) -> list[dict]:
    """Semantic search: match gaps against course catalogue.
    For each gap, find top courses that address that competency.
    Returns ranked list of {course_id, title, relevance_score, addresses_gaps: [...]}"""
    recommendations = {}
    
    gap_map = {g["competency_id"]: g for g in gaps}
    
    for course in courses:
        addressed = []
        relevance = 0.0
        
        for tag in course.get("competency_tags", []):
            if tag in gap_map:
                addressed.append(tag)
                relevance += gap_map[tag]["priority"]
                
        if addressed:
            course_id = course["igot_id"]
            if course_id not in recommendations:
                recommendations[course_id] = {
                    "course_id": course_id,
                    "title": course.get("title", ""),
                    "relevance_score": relevance,
                    "addresses_gaps": addressed
                }
            else:
                recommendations[course_id]["relevance_score"] += relevance
                recommendations[course_id]["addresses_gaps"].extend(addressed)
                
    # Remove duplicate gaps
    for k in recommendations:
        recommendations[k]["addresses_gaps"] = list(set(recommendations[k]["addresses_gaps"]))
        
    res = list(recommendations.values())
    res.sort(key=lambda x: x["relevance_score"], reverse=True)
    return res

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
