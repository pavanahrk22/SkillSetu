from sqlalchemy.orm import Session
from models.competency import Competency, UserCompetency
from models.user import User
from schemas.competency import SkillGapItem, SkillGapResponse
from app_config.job_roles import JOB_ROLE_REQUIREMENTS

async def analyze_gaps(user_id: int, db: Session) -> SkillGapResponse:
    """Given a user's designation and UserCompetency records, compute gaps."""
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise ValueError(f"User {user_id} not found")

    designation = user.designation or "Junior Statistical Officer"
    required = JOB_ROLE_REQUIREMENTS.get(designation, JOB_ROLE_REQUIREMENTS["Junior Statistical Officer"])

    # Get user's current competencies
    user_comps = db.query(UserCompetency).filter(UserCompetency.user_id == user_id).all()
    current_map = {}
    for uc in user_comps:
        comp = db.query(Competency).filter(Competency.id == uc.competency_id).first()
        if comp:
            current_map[comp.name] = {"level": uc.current_level, "id": comp.id, "domain": comp.domain}

    gaps = []
    for comp_name, req_level in required.items():
        curr = current_map.get(comp_name, {"level": 0, "id": None, "domain": "technical"})
        curr_level = curr["level"]
        gap = req_level - curr_level
        if gap > 0:
            severity = "critical" if gap >= 4 else "high" if gap >= 3 else "medium" if gap >= 2 else "low"
            comp_obj = db.query(Competency).filter(Competency.name == comp_name).first()
            gaps.append(SkillGapItem(
                competency_id=comp_obj.id if comp_obj else 0,
                competency_name=comp_name,
                domain=curr.get("domain", comp_obj.domain if comp_obj else "technical"),
                current_level=curr_level,
                required_level=req_level,
                gap=gap,
                severity=severity,
            ))

    gaps.sort(key=lambda x: x.gap, reverse=True)

    return SkillGapResponse(
        user_id=user_id,
        designation=designation,
        total_gaps=len(gaps),
        gaps=gaps,
    )
