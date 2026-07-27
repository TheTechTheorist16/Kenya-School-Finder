from fastapi import APIRouter, Query, HTTPException
from database import SessionLocal
from models import SubjectCombination

router = APIRouter()


@router.get("/tracks")
def get_tracks(pathway: str = Query(...)):

    db = SessionLocal()

    try:
        tracks = (
            db.query(SubjectCombination.track)
            .filter(SubjectCombination.pathway == pathway)
            .distinct()
            .order_by(SubjectCombination.track)
            .all()
        )

        return [track[0] for track in tracks if track[0]]

    except Exception as e:
        raise HTTPException(
            status_code=500,
            detail=str(e)
        )

    finally:
        db.close()