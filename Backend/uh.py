from database import SessionLocal
from models import SubjectCombination

db = SessionLocal()

count = (
    db.query(SubjectCombination)
    .filter(
        SubjectCombination.track == "PURE SCIENCES"
    )
    .count()
)

print(count)

db.close()