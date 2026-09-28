import json
import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from database import engine, Base, SessionLocal
from routers import auth, users, competencies, courses, assessments, admin

# Create tables
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Competency Gap Analyzer & Personalized Learning Platform",
    description="SIH 2026 — AI-powered skill-gap analysis and course recommendation for Indian Government Statistical Officials",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(competencies.router)
app.include_router(courses.router)
app.include_router(assessments.router)
app.include_router(admin.router)


def seed_database():
    """Seed competency taxonomy and iGOT course catalogue if tables are empty."""
    from models.competency import Competency
    from models.course import Course

    db = SessionLocal()
    try:
        # Seed competencies
        if db.query(Competency).count() == 0:
            data_dir = os.path.join(os.path.dirname(__file__), "data")
            taxonomy_path = os.path.join(data_dir, "competency_taxonomy.json")
            if os.path.exists(taxonomy_path):
                with open(taxonomy_path, "r", encoding="utf-8") as f:
                    taxonomy = json.load(f)
                for comp in taxonomy:
                    db.add(Competency(
                        name=comp["name"],
                        domain=comp["domain"],
                        description=comp.get("description", ""),
                        level=comp.get("level", 5),
                    ))
                db.commit()
                print(f"[SEED] Loaded {len(taxonomy)} competencies from taxonomy.")

        # Seed courses
        if db.query(Course).count() == 0:
            data_dir = os.path.join(os.path.dirname(__file__), "data")
            courses_path = os.path.join(data_dir, "igot_courses.json")
            if os.path.exists(courses_path):
                with open(courses_path, "r", encoding="utf-8") as f:
                    course_data = json.load(f)
                for c in course_data:
                    db.add(Course(
                        title=c["title"],
                        description=c.get("description", ""),
                        competency_tags=c.get("competency_tags", []),
                        level=c.get("level", "beginner"),
                        source=c.get("source", "iGOT"),
                        provider=c.get("provider", ""),
                        duration_hours=c.get("duration_hours", 0),
                        url=c.get("url", ""),
                    ))
                db.commit()
                print(f"[SEED] Loaded {len(course_data)} courses from iGOT catalogue.")
        
        # Verify job role competencies
        from app_config.job_roles import JOB_ROLE_REQUIREMENTS
        comp_names_in_db = {c.name for c in db.query(Competency).all()}
        missing = set()
        for role, requirements in JOB_ROLE_REQUIREMENTS.items():
            for req_comp in requirements.keys():
                if req_comp not in comp_names_in_db:
                    missing.add(req_comp)
        if missing:
            print(f"WARNING: The following competencies from JOB_ROLE_REQUIREMENTS are missing in the Competency table: {', '.join(missing)}")
            
    except Exception as e:
        print(f"[SEED ERROR] {e}")
        db.rollback()
    finally:
        db.close()


@app.on_event("startup")
async def startup_event():
    seed_database()


@app.get("/")
def read_root():
    return {
        "message": "Competency Gap Analyzer & Personalized Learning Platform API",
        "version": "1.0.0",
        "docs": "/docs",
        "endpoints": {
            "auth": "/auth/login, /auth/register, /auth/me",
            "competencies": "/competencies/, /competencies/gaps, /competencies/self-assess",
            "courses": "/courses/, /courses/recommendations/{user_id}",
            "assessments": "/assessments/generate-quiz, /assessments/submit-quiz",
            "admin": "/admin/workforce/heatmap, /admin/training/effectiveness",
        },
        "note": "Designed to swap in live iGOT API on integration approval",
    }
