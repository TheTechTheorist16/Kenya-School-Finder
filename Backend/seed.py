from database import SessionLocal
from models import School

db = SessionLocal()

schools = [
    School(
        name="Alliance High School",
        county="Kiambu",
        gender="Boys",
        boarding=True,
        pathway="STEM",
        combination="ST1034"
    ),
    School(
        name="Mang'u High School",
        county="Kiambu",
        gender="Boys",
        boarding=True,
        pathway="STEM",
        combination="ST1034"
    ),
    School(
        name="Upper Hill School",
        county="Nairobi",
        gender="Boys",
        boarding=False,
        pathway="STEM",
        combination="ST1034"
    )
]

db.add_all(schools)
db.commit()
db.close()

print("✅ Schools added successfully!")