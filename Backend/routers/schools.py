from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import joinedload

from database import SessionLocal
from models import School, SubjectCombination
from services.school_stats import get_school_stats

router = APIRouter()


@router.get("/schools")
def get_schools(limit: int = 20):

    db = SessionLocal()

    schools = (
        db.query(School)
        .limit(limit)
        .all()
    )

    results = [

        {
            "school_id": school.school_id,
            "name": school.name,
            "region": school.region,
            "county": school.county,
            "sub_county": school.sub_county,
            "cluster": school.cluster,
            "gender": school.gender,
            "accommodation": school.accommodation,
            "institution_type": school.institution_type,
        }

        for school in schools

    ]

    db.close()

    return results


@router.get("/schools/{school_id}")
def get_school(school_id: str):

    db = SessionLocal()

    school = (

        db.query(School)

        .options(joinedload(School.combinations))

        .filter(School.school_id == school_id)

        .first()

    )

    if not school:

        db.close()

        raise HTTPException(
            status_code=404,
            detail="School not found"
        )

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
        "stats": get_school_stats(school),

        "combinations": [

            {
                "code": combo.combination_code,
                "name": combo.combination_name,
                "pathway": combo.pathway
            }

            for combo in school.combinations

        ]

    }

    db.close()

    return result


@router.get("/school-search")
def school_search(q: str):

    db = SessionLocal()

    schools = (

        db.query(School)

        .filter(
            School.name.ilike(f"%{q}%")
        )

        .limit(20)

        .all()

    )

    results = [

        {
            "school_id": school.school_id,
            "name": school.name,
            "county": school.county,
            "cluster": school.cluster,
        }

        for school in schools
    ]
@router.get("/schools/by-combination")
def get_schools_by_combination(code: str):

    db = SessionLocal()

    schools = (
        db.query(School)
        .join(School.combinations)
        .filter(
            SubjectCombination.combination_code == code
        )
        .all()
    )

    results = [
        {
            "school_id": school.school_id,
            "name": school.name,
            "county": school.county,
            "cluster": school.cluster,
            "gender": school.gender,
            "accommodation": school.accommodation,
            "institution_type": school.institution_type
        }
        for school in schools
    ]

    db.close()

    return results
    

