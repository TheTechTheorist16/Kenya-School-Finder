from fastapi import APIRouter

from database import SessionLocal
from models import School, SubjectCombination

router = APIRouter()


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


@router.get("/statistics")
def get_statistics():

    db = SessionLocal()

    statistics = {

        "schools":
            db.query(School).count(),

        "subject_combinations":
            db.query(SubjectCombination).count(),

        "counties":
            db.query(School.county).distinct().count(),

        "clusters":
            db.query(School.cluster).distinct().count(),

        "subjects":
            len(get_subjects())

    }

    db.close()

    return statistics