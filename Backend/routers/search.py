from typing import List, Optional

from fastapi import APIRouter, Query
from sqlalchemy.orm import joinedload

from database import SessionLocal
from models import School, SubjectCombination
from services.school_stats import get_school_stats
from services.recommendation import calculate_score
from models import School, SubjectCombination
router = APIRouter()


@router.get("/search")
def search_schools(
    combination_code: str = None,
    subjects: List[str] = Query(default=[]),
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
    if combination_code:
     query = query.join(
        SubjectCombination
    ).filter(
        SubjectCombination.combination_code == combination_code
    )
    if school_name:
        query = query.filter(
            School.name.ilike(f"%{school_name}%")
        )

    if county:
        query = query.filter(
            School.county == county
        )

    if sub_county:
        query = query.filter(
            School.sub_county == sub_county
        )

    if cluster:
        query = query.filter(
            School.cluster == cluster
        )

    if gender:
        query = query.filter(
            School.gender == gender
        )

    if accommodation:
        query = query.filter(
            School.accommodation == accommodation
        )

    if institution_type:
        query = query.filter(
            School.institution_type == institution_type
        )

    # Get all matching schools
    schools = query.all()

    selected = {
        subject.strip()
        for subject in subjects
    }

    results = []

    for school in schools:

        matching = []

        for combo in school.combinations:

            combo_subjects = {
                subject.strip()
                for subject in combo.combination_name.split(",")
            }

            if selected.issubset(combo_subjects):

                matching.append({

                    "code": combo.combination_code,
                    "name": combo.combination_name,
                    "pathway": combo.pathway

                })

        if matching:

            score = calculate_score(
                school,
                matching
            )

            results.append({

                "school_id": school.school_id,
                "name": school.name,
                "county": school.county,
                "sub_county": school.sub_county,
                "cluster": school.cluster,
                "gender": school.gender,
                "accommodation": school.accommodation,
                "institution_type": school.institution_type,

                "stats": get_school_stats(school),

                "matching_combinations": matching,
                

"selected_combination":
    combination_code if combination_code else None,

                "match_count": len(matching),

                "recommendation_score": score

            })

    results.sort(
        key=lambda school: school["recommendation_score"],
        reverse=True
    )

    db.close()

    return results