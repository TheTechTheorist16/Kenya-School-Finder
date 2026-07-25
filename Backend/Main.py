from typing import List, Optional, Tuple
from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, Query
from sqlalchemy import Row
from sqlalchemy.orm import joinedload

from database import SessionLocal
from models import School, SubjectCombination
from fastapi.middleware.cors import CORSMiddleware
app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def home():
    return {"message": "Kenya School Finder API"}


@app.get("/schools")
def get_schools(
    county: Optional[str] = None,
    cluster: Optional[str] = None,
    gender: Optional[str] = None,
    accommodation: Optional[str] = None,
    institution_type: Optional[str] = None,
    limit: int = 20,
):

    db = SessionLocal()

    query = db.query(School)

    if county:
        query = query.filter(School.county == county)

    if cluster:
        query = query.filter(School.cluster == cluster)

    if gender:
        query = query.filter(School.gender == gender)

    if accommodation:
        query = query.filter(School.accommodation == accommodation)

    if institution_type:
        query = query.filter(School.institution_type == institution_type)

    schools = query.limit(limit).all()

    results = []

    for school in schools:
        results.append({
            "school_id": school.school_id,
            "name": school.name,
            "region": school.region,
            "county": school.county,
            "sub_county": school.sub_county,
            "cluster": school.cluster,
            "gender": school.gender,
            "accommodation": school.accommodation,
            "institution_type": school.institution_type
        })

    db.close()

    return results


@app.get("/subjects")
def get_subjects():

    db = SessionLocal()

    combinations = db.query(
        SubjectCombination.combination_name
    ).all()

    subjects = set()

    for combo in combinations:
        if combo.combination_name:
            for subject in combo.combination_name.split(","):
                subjects.add(subject.strip())

    db.close()

    return sorted(subjects)
@app.get("/search")
def search_schools(
    subjects: list[str] = Query(default=[]),
    school_name: Optional[str] = None,
    county: Optional[str] = None,
    sub_county: Optional[str] = None,
    cluster: Optional[str] = None,
    gender: Optional[str] = None,
    accommodation: Optional[str] = None,
    institution_type: Optional[str] = None,
):

    db = SessionLocal()

    query = db.query(School).options(
        joinedload(School.combinations)
    )
    if school_name:
        query = query.filter(
            School.name.ilike(f"%{school_name}%")
        )

    if county:
        query = query.filter(School.county == county)

    if sub_county:
        query = query.filter(School.sub_county == sub_county)

    if cluster:
        query = query.filter(School.cluster == cluster)

    if gender:
        query = query.filter(School.gender == gender)

    if accommodation:
        query = query.filter(
            School.accommodation == accommodation
        )

    if institution_type:
        query = query.filter(
            School.institution_type == institution_type
        )

    schools = query.all()

    results = []

    selected = {s.strip() for s in subjects}

    for school in schools:

        matching = []

        for combo in school.combinations:

            combo_subjects = {
                s.strip()
                for s in combo.combination_name.split(",")
            }

            if selected.issubset(combo_subjects):

                matching.append({
                    "code": combo.combination_code,
                    "name": combo.combination_name,
                    "pathway": combo.pathway
                })

        if matching:

            results.append({
                "school_id": school.school_id,
                "name": school.name,
                "county": school.county,
                "cluster": school.cluster,
                "gender": school.gender,
                "accommodation": school.accommodation,
                "institution_type": school.institution_type,
                "matching_combinations": matching
            })

    db.close()

    return results
@app.get("/schools/{school_id}")
def get_school(school_id: str):

    db = SessionLocal()

    school = (
        db.query(School)
        .filter(School.school_id == school_id)
        .first()
    )

    if school is None:
        db.close()
        return {"error": "School not found"}

    combinations = []

    for combo in school.combinations:
        combinations.append({
            "code": combo.combination_code,
            "name": combo.combination_name,
            "pathway": combo.pathway
        })

    result = {
        "school_id": school.school_id,
        "name": school.name,
        "region": school.region,
        "county": school.county,
        "sub_county": school.sub_county,
        "cluster": school.cluster,
        "gender": school.gender,
        "accommodation": school.accommodation,
        "institution_type": school.institution_type,
        "subject_combinations": combinations
    }

    db.close()

    return result
@app.get("/counties")
def get_counties():

    db = SessionLocal()

    counties = (
        db.query(School.county)
        .distinct()
        .order_by(School.county)
        .all()
    )

    db.close()

    return [county[0] for county in counties if county[0]]
@app.get("/regions")
def get_regions():

    db = SessionLocal()

    regions = (
        db.query(School.region)
        .distinct()
        .order_by(School.region)
        .all()
    )

    db.close()

    return [region[0] for region in regions if region[0]]
@app.get("/clusters")
def get_clusters():

    db = SessionLocal()

    clusters = (
        db.query(School.cluster)
        .distinct()
        .order_by(School.cluster)
        .all()
    )

    db.close()

    return [c[0] for c in clusters]
@app.get("/sub-counties")
def get_sub_counties(county: str):

    db = SessionLocal()

    sub_counties = (
        db.query(School.sub_county)
        .filter(School.county == county)
        .distinct()
        .order_by(School.sub_county)
        .all()
    )

    db.close()

    return [s[0] for s in sub_counties]
@app.get("/statistics")
def get_statistics():

    db = SessionLocal()

    school_count = db.query(School).count()

    combination_count = db.query(
        SubjectCombination
    ).count()

    county_count = (
        db.query(School.county)
        .distinct()
        .count()
    )

    subject_count = len(get_subjects())

    cluster_count = (
        db.query(School.cluster)
        .distinct()
        .count()
    )

    db.close()

    return {
        "schools": school_count,
        "subject_combinations": combination_count,
        "counties": county_count,
        "subjects": subject_count,
        "clusters": cluster_count
    }
@app.get("/genders")
def get_genders():

    db = SessionLocal()

    genders = (
        db.query(School.gender)
        .distinct()
        .order_by(School.gender)
        .all()
    )

    db.close()

    return [gender[0] for gender in genders if gender[0]]
@app.get("/accommodations")
def get_accommodations():

    db = SessionLocal()

    accommodations: List[Row[Tuple[str]]] = (
        db.query(School.accommodation)
        .distinct()
        .order_by(School.accommodation)
        .all()
    )
    db.close()

    return [a[0] for a in accommodations if a[0]]
@app.get("/institution-types")
def get_institution_types():

    db = SessionLocal()

    types = (
        db.query(School.institution_type)
        .distinct()
        .order_by(School.institution_type)
        .all()
    )

    db.close()

    return [t[0] for t in types if t[0]]
@app.get("/pathways")
def get_pathways():

    db = SessionLocal()

    pathways = (
        db.query(SubjectCombination.pathway)
        .distinct()
        .order_by(SubjectCombination.pathway)
        .all()
    )

    db.close()

    return [p[0] for p in pathways if p[0]]
@app.get("/school-search")
def school_search(q: str):

    db = SessionLocal()

    schools = (
        db.query(School)
        .filter(School.name.ilike(f"%{q}%"))
        .limit(20)
        .all()
    )

    db.close()

    return [
        {
            "school_id": s.school_id,
            "name": s.name,
            "county": s.county,
            "cluster": s.cluster
        }
        for s in schools
    ]