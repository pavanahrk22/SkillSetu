async def extract_competencies_from_profile(profile_text: str, taxonomy: list[dict]) -> list[dict]:
    """NLP-based extraction: parse profile text, match against competency taxonomy.
    Returns list of {competency_id, competency_name, inferred_level, confidence}"""
    extracted = []
    text_lower = profile_text.lower()
    
    for comp in taxonomy:
        # Mock logic: keyword match on domain and name
        if comp["domain"].lower() in text_lower or comp["name"].lower() in text_lower:
            extracted.append({
                "competency_id": comp["id"],
                "competency_name": comp["name"],
                "inferred_level": 2, # Mock inferred level
                "confidence": 0.85
            })
            
    # Return top 5 for mock
    return extracted[:5]

async def map_role_to_competencies(role: str, department: str, role_map: dict) -> list[dict]:
    """Look up required competencies for a role."""
    roles = role_map.get("roles", [])
    for r in roles:
        if r["role"].lower() == role.lower():
            return r["required_competencies"]
    return []
