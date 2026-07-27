from fastapi import APIRouter
from database import SessionLocal
from models import SubjectCombination

router = APIRouter()


@router.get("/pathways")
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