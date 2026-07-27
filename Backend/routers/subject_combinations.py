from fastapi import APIRouter
from database import SessionLocal
from models import SubjectCombination

router = APIRouter()


@router.get("/subject-combinations")
def get_subject_combinations(track: str, combination_code: str = None):

    db = SessionLocal()

    try:

        combinations = (
            db.query(SubjectCombination)
            .filter(
                SubjectCombination.track == track
            )
            .group_by(
                SubjectCombination.combination_code
            )
            .order_by(
                SubjectCombination.combination_code
            )
            .all()
        )

        return [
            {
                "code": combo.combination_code,
                "name": combo.combination_name,
                "pathway": combo.pathway,
                "track": combo.track
            }
            for combo in combinations
        ]

    finally:
        db.close()



@router.get("/debug-tracks")
def debug_tracks():

    db = SessionLocal()

    try:

        tracks = (
            db.query(
                SubjectCombination.track
            )
            .distinct()
            .all()
        )

        return [
            track[0]
            for track in tracks
        ]

    finally:
        db.close()



@router.get("/debug-count")
def debug_count():

    db = SessionLocal()

    try:

        total = (
            db.query(SubjectCombination)
            .count()
        )

        unique = (
            db.query(
                SubjectCombination.combination_code
            )
            .distinct()
            .count()
        )

        return {
            "total_rows": total,
            "unique_codes": unique
        }

    finally:
        db.close()



@router.get("/debug-all-combinations")
def debug_all_combinations():

    db = SessionLocal()

    try:

        combos = (
            db.query(
                SubjectCombination.combination_code,
                SubjectCombination.combination_name,
                SubjectCombination.pathway,
                SubjectCombination.track
            )
            .limit(500)
            .all()
        )

        return [
            {
                "code": combo.combination_code,
                "name": combo.combination_name,
                "pathway": combo.pathway,
                "track": combo.track
            }
            for combo in combos
        ]

    finally:
        db.close()