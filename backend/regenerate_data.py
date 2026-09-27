import json
import os

base_path = r"c:\Users\Pavana H\OneDrive\Desktop\SIH 2026\backend"
data_path = os.path.join(base_path, "data")
os.makedirs(data_path, exist_ok=True)

competency_taxonomy = [
  {
    "id": 1,
    "name": "Statistical Data Collection",
    "domain": "statistical",
    "description": "Methods and techniques for systematic collection of statistical data including census, sample surveys, and administrative data sources"
  },
  {
    "id": 2,
    "name": "Sampling Techniques",
    "domain": "statistical",
    "description": "Design and implementation of probability and non-probability sampling methods including stratified, cluster, and multi-stage sampling"
  },
  {
    "id": 3,
    "name": "Basic Statistical Methods",
    "domain": "statistical",
    "description": "Descriptive statistics, measures of central tendency, dispersion, correlation, regression, and index numbers"
  },
  {
    "id": 4,
    "name": "Advanced Statistical Analysis",
    "domain": "statistical",
    "description": "Time series analysis, multivariate methods, Bayesian statistics, hypothesis testing, and inferential statistics"
  },
  {
    "id": 5,
    "name": "Econometric Modelling",
    "domain": "statistical",
    "description": "Building and validating econometric models for policy analysis, GDP estimation, and economic forecasting"
  },
  {
    "id": 6,
    "name": "Survey Design",
    "domain": "technical",
    "description": "Questionnaire design, survey methodology, pilot testing, and quality assurance for large-scale government surveys like NSSO rounds"
  },
  {
    "id": 7,
    "name": "Data Visualization",
    "domain": "technical",
    "description": "Creating charts, dashboards, and infographics using tools like Tableau, Power BI, or R/Python visualization libraries"
  },
  {
    "id": 8,
    "name": "Statistical Software (R/Python/SPSS)",
    "domain": "technical",
    "description": "Proficiency in statistical computing tools for data analysis, automation, and reproducible research"
  },
  {
    "id": 9,
    "name": "Database Management",
    "domain": "technical",
    "description": "SQL, data warehousing, database design, and management of large government datasets"
  },
  {
    "id": 10,
    "name": "MS Excel & Office Tools",
    "domain": "technical",
    "description": "Advanced Excel (pivot tables, VLOOKUP, macros), Word, PowerPoint for statistical reporting and presentations"
  },
  {
    "id": 11,
    "name": "Digital Governance Tools",
    "domain": "digital_governance",
    "description": "e-Office, PFMS, GeM, government portals, and digital transformation initiatives under Digital India"
  },
  {
    "id": 12,
    "name": "Data Governance & Privacy",
    "domain": "digital_governance",
    "description": "Data protection frameworks, IT Act provisions, statistical confidentiality, and ethical data handling in government"
  },
  {
    "id": 13,
    "name": "Government Data Standards",
    "domain": "digital_governance",
    "description": "National Data Sharing and Accessibility Policy, metadata standards, open data protocols, and interoperability frameworks"
  },
  {
    "id": 14,
    "name": "Leadership & Mentoring",
    "domain": "behavioural",
    "description": "Team leadership, mentoring junior officers, decision-making, and organizational development"
  },
  {
    "id": 15,
    "name": "Written Communication",
    "domain": "behavioural",
    "description": "Report writing, noting and drafting, statistical report preparation, and official correspondence"
  }
]

with open(os.path.join(data_path, "competency_taxonomy.json"), "w") as f:
    json.dump(competency_taxonomy, f, indent=2)

import random

topics = [
    ("NSS survey methodology, NSSO rounds", ["Survey Design", "Statistical Data Collection"]),
    ("Census operations and methodology", ["Statistical Data Collection", "Sampling Techniques"]),
    ("CPI/WPI index number compilation", ["Basic Statistical Methods", "Econometric Modelling"]),
    ("National Accounts (GDP/GVA estimation)", ["Econometric Modelling", "Advanced Statistical Analysis"]),
    ("Annual Survey of Industries", ["Statistical Data Collection", "Database Management"]),
    ("R/Python for statistical computing", ["Statistical Software (R/Python/SPSS)", "Data Visualization"]),
    ("SPSS/Stata for government data", ["Statistical Software (R/Python/SPSS)", "Basic Statistical Methods"]),
    ("Data visualization dashboards", ["Data Visualization", "MS Excel & Office Tools"]),
    ("e-Office and digital governance", ["Digital Governance Tools"]),
    ("PFMS, GeM portal training", ["Digital Governance Tools"]),
    ("Statistical report writing", ["Written Communication", "Basic Statistical Methods"]),
    ("Leadership for statistical officers", ["Leadership & Mentoring"]),
    ("GIS and spatial statistics", ["Advanced Statistical Analysis", "Data Visualization"]),
    ("Big data analytics for government", ["Database Management", "Advanced Statistical Analysis"]),
    ("Data quality management", ["Data Governance & Privacy", "Government Data Standards"]),
    ("Time series analysis", ["Advanced Statistical Analysis", "Econometric Modelling"]),
    ("Sampling theory and design", ["Sampling Techniques", "Survey Design"])
]

providers = ["NSSTA Mahalanobis", "ISI Kolkata", "IASRI", "CDAC", "LBSNAA", "ISTM", "National e-Governance Academy", "MoSPI", "NIFM", "TPAC"]

courses = []
levels = ["beginner"]*15 + ["intermediate"]*15 + ["advanced"]*10
sources = ["iGOT"]*30 + ["TPAC"]*10

random.seed(42)
random.shuffle(levels)
random.shuffle(sources)

for i in range(1, 41):
    topic, tags = random.choice(topics)
    courses.append({
        "id": i,
        "title": f"Course on {topic} (Part {random.randint(1,5)})",
        "description": f"Comprehensive training on {topic} tailored for government officials.",
        "competency_tags": tags,
        "level": levels[i-1],
        "source": sources[i-1],
        "provider": random.choice(providers),
        "duration_hours": random.choice([4, 8, 12, 16, 20, 24]),
        "url": f"https://igot.gov.in/course/{i}" if sources[i-1] == "iGOT" else f"https://tpac.gov.in/course/{i}"
    })

with open(os.path.join(data_path, "igot_courses.json"), "w") as f:
    json.dump(courses, f, indent=2)

role_map_path = os.path.join(data_path, "role_competency_map.json")
if os.path.exists(role_map_path):
    os.remove(role_map_path)

print("Regeneration complete!")
