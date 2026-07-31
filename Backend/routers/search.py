from typing import List, Optional

from fastapi import APIRouter, Query
from sqlalchemy.orm import joinedload

from database import SessionLocal
from models import School, SubjectCombination
from services.school_stats import get_school_stats
from services.recommendation import calculate_score

router = APIRouter()


@router.get("/search")
def search_schools(

    combination_code: Optional[str] = None,

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

    schools = query.all()

    selected = {
        subject.strip()
        for subject in subjects
    }

    results = []

    for school in schools:

        matching = []

        for combo in school.combinations:

            # Search using combination code
            if combination_code:

                if combo.combination_code == combination_code:

                    matching.append({

                        "code": combo.combination_code,
                        "name": combo.combination_name,
                        "pathway": combo.pathway

                    })

            # Search using selected subjects
            elif selected:

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

        # Skip ONLY if user searched for combinations
        if (combination_code or selected) and not matching:
            continue

        score = calculate_score(
            school,
            matching
        )

        results.append({

            "school_id": school.school_id,

            "name": school.name,

            "region": school.region,

            "county": school.county,

            "sub_county": school.sub_county,

            "knec_code": school.knec_code,

            "cluster": school.cluster,

            "category": school.category,

            "gender": school.gender,

            "accommodation": school.accommodation,

            "institution_type": school.institution_type,

            "disability_type": school.disability_type,

            "stats": get_school_stats(school),

            "matching_combinations": matching,

            "selected_combination": combination_code,

            "match_count": len(matching),

            "recommendation_score": score

        })

    results.sort(

        key=lambda school: school["recommendation_score"],

        reverse=True

    )

    db.close()

    return results