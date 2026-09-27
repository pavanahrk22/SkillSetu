import json
import os
import random

base_path = r"c:\Users\Pavana H\OneDrive\Desktop\SIH 2026\backend"
os.makedirs(os.path.join(base_path, 'data'), exist_ok=True)
os.makedirs(os.path.join(base_path, 'services'), exist_ok=True)

# 1. Generate Competency Taxonomy
domains = {
    "Digital & IT Skills": 15,
    "Public Administration & Governance": 12,
    "Financial Management": 10,
    "Communication & Leadership": 10,
    "Domain-Specific Technical": 10,
    "Data & Analytics": 8,
    "Project Management": 8,
    "Legal & Regulatory": 7
}

levels_template = [
    {"level": 1, "name": "Awareness", "description": "Basic understanding and awareness of the concepts"},
    {"level": 2, "name": "Foundation", "description": "Fundamental knowledge and ability to apply in simple scenarios"},
    {"level": 3, "name": "Practitioner", "description": "Practical application in routine professional situations"},
    {"level": 4, "name": "Advanced", "description": "Advanced application, handling complex scenarios and mentoring"},
    {"level": 5, "name": "Expert", "description": "Strategic leadership and shaping organizational frameworks"}
]

topics_mock = ["Fundamentals", "Advanced Strategies", "Policy Framework", "Implementation", "Auditing", "Compliance", "Ethics", "Governance", "Innovation", "Digital Transformation", "Cybersecurity", "Public Finance", "Risk Management", "Data Privacy", "E-Governance"]

competencies = []
for domain, count in domains.items():
    prefix = domain[:3].upper()
    for i in range(count):
        topic_name = random.choice(topics_mock)
        competencies.append({
            "id": f"{prefix}-{str(i+1).zfill(3)}",
            "name": f"{domain} - {topic_name} {i+1}",
            "description": f"Understanding and proficiency in {domain.lower()} related to {topic_name.lower()}",
            "domain": domain,
            "category": "General",
            "levels": levels_template
        })

with open(os.path.join(base_path, 'data', 'competency_taxonomy.json'), 'w') as f:
    json.dump(competencies, f, indent=2)

# 2. Generate iGOT Courses
providers = ["LBSNAA", "ISTM", "CDAC", "NIEPA", "NIFM", "IIPA", "NIRD", "ASCI", "DTI", "MCRHRD"]
categories = list(domains.keys())
difficulty = ["beginner", "intermediate", "advanced"]
diff_distribution = ["beginner"]*35 + ["intermediate"]*40 + ["advanced"]*25

courses = []
for i in range(100):
    courses.append({
        "igot_id": f"IGOT-2024-{str(i+1).zfill(3)}",
        "title": f"Course on {random.choice(categories)} - Module {i+1}",
        "description": f"This course covers essential concepts in {random.choice(categories)}.",
        "provider": random.choice(providers),
        "duration_hours": random.randint(2, 40),
        "competency_tags": [random.choice(competencies)["id"] for _ in range(random.randint(1, 3))],
        "difficulty_level": diff_distribution[i],
        "url": f"https://igot.gov.in/course/IGOT-2024-{str(i+1).zfill(3)}",
        "category": random.choice(categories),
        "language": random.choice(["English", "Hindi"]),
        "certification": random.choice([True, False]),
        "prerequisites": [],
        "learning_outcomes": ["Identify common issues", "Apply best practices"]
    })

with open(os.path.join(base_path, 'data', 'igot_courses.json'), 'w') as f:
    json.dump(courses, f, indent=2)

# 3. Generate Role Competency Map
roles = ["Section Officer", "Under Secretary", "Deputy Secretary", "Joint Secretary", "District Collector", "BDO", "Accounts Officer", "IT Officer", "HR Manager", "Project Coordinator", "Data Analyst", "Legal Advisor", "Audit Officer", "Public Relations Officer", "Training Coordinator", "Assistant Director", "Deputy Director", "Director", "Chief Secretary"]

role_map = {"roles": []}
for role in roles:
    req_comps = []
    for _ in range(random.randint(3, 7)):
        req_comps.append({
            "competency_id": random.choice(competencies)["id"],
            "required_level": random.randint(1, 5)
        })
    role_map["roles"].append({
        "role": role,
        "department": "Various",
        "required_competencies": req_comps
    })

with open(os.path.join(base_path, 'data', 'role_competency_map.json'), 'w') as f:
    json.dump(role_map, f, indent=2)

print("Data generation complete.")
