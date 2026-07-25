import time
import requests
import urllib3

from database import SessionLocal
from models import School, SubjectCombination

urllib3.disable_warnings(urllib3.exceptions.InsecureRequestWarning)

BASE_URL = (
    "https://selection.education.go.ke/api/api/v1/"
    "map/senior-secondary/subject-combinations"
)

db = SessionLocal()

schools = db.query(School).all()
total = len(schools)

print(f"Found {total} schools.\n")

saved = 0
skipped = 0
failed = 0

for index, school in enumerate(schools, start=1):

    print(f"[{index}/{total}] {school.name}")

    # Skip schools already downloaded
    if db.query(SubjectCombination).filter(
        SubjectCombination.school_id == school.school_id
    ).first():

        print("   Already downloaded.")
        skipped += 1
        continue

    try:

        response = requests.get(
            BASE_URL,
            params={
                "school-id": school.school_id
            },
            verify=False,
            timeout=30
        )

        response.raise_for_status()

        data = response.json()

        combinations = data.get("feedback", [])

        if not combinations:
            print("   No subject combinations.")
            continue

        for combo in combinations:

            db.add(
                SubjectCombination(
                    school_id=school.school_id,
                    pathway=combo.get("pathway", ""),
                    track=combo.get("track", ""),
                    combination_code=combo.get("subject_combination_code", ""),
                    combination_name=combo.get("subject_combination_name", "")
                )
            )

            saved += 1

        db.commit()

        print(f"   Saved {len(combinations)} combinations.")

    except Exception as e:

        db.rollback()
        failed += 1

        print("   ERROR:", e)

    time.sleep(0.15)

db.close()

print("\n==============================")
print("Finished!")
print(f"Saved combinations : {saved}")
print(f"Skipped schools    : {skipped}")
print(f"Failed schools     : {failed}")
print("==============================")