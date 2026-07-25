import os
import json

print("Current directory:")
print(os.getcwd())

print("\nDoes file exist?")
print(os.path.exists("all-schools.json"))

print("\nFiles:")
print(os.listdir())

from database import SessionLocal
from models import School

db = SessionLocal()

with open("all-schools.json", "r", encoding="utf-8") as f:
    schools = json.load(f)

print(f"Importing {len(schools)} schools...\n")

count = 0

for s in schools:

    exists = db.query(School).filter(
        School.school_id == s["id"]
    ).first()

    if exists:
        continue

    school = School(
        school_id=s["id"],
        name=s["institution_name"].strip(),
        region=s["region"],
        county=s["county"],
        sub_county=s["sub_county"],
        knec_code=s["knec"],
        institution_type=s["institution_type"],
        cluster=s["cluster"],
        category=s["category"],
        disability_type=s["disability_type"],
        accommodation=s["accomodation_type"],
        gender=s["gender"],
    )

    db.add(school)
    count += 1

    if count % 500 == 0:
        db.commit()
        print(f"{count} imported...")

db.commit()
db.close()

print()
print(f"Finished! Imported {count} schools.")