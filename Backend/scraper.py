import json
import sqlite3
import time
from concurrent.futures import ThreadPoolExecutor, as_completed

import requests
from tqdm import tqdm

from regions import regions

BASE = "https://selection.education.go.ke/api/api/v1"

session = requests.Session()

conn = sqlite3.connect("schools.db")
cur = conn.cursor()

cur.execute("""
CREATE TABLE IF NOT EXISTS schools(
    id TEXT PRIMARY KEY,
    name TEXT,
    knec TEXT,
    gender TEXT,
    cluster TEXT,
    accommodation TEXT,
    institution_type TEXT,
    region TEXT,
    county TEXT,
    sub_county TEXT,
    details TEXT
)
""")

conn.commit()

school_ids = []

print("Collecting schools...")

for region_name, region in regions.items():

    for county_name, subcounties in region["counties"].items():

        for subcounty in subcounties:

            try:

                r = session.get(
                    BASE + "/filter/senior-schools",
                    params={
                        "region": region_name,
                        "county": county_name,
                        "sub-county": subcounty
                    },
                    timeout=30
                )

                schools = r.json().get("senior_schools", [])

                for school in schools:

                    school["region"] = region_name
                    school["county"] = county_name
                    school["sub_county"] = subcounty

                    school_ids.append(school)

            except Exception as e:
                print("Failed:", region_name, county_name, subcounty, e)

print("Found", len(school_ids), "schools")

def download_school(school):

    try:

        r = session.get(
            BASE + "/map/senior-secondary/subject-combinations",
            params={
                "school-id": school["id"]
            },
            timeout=30
        )

        details = r.json()

    except:

        details = {}

    cur.execute("""
    INSERT OR REPLACE INTO schools
    VALUES(?,?,?,?,?,?,?,?,?,?,?)
    """, (

        school["id"],
        school["institution_name"],
        school["knec"],
        school["gender"],
        school["cluster"],
        school["accomodation_type"],
        school["institution_type"],
        school["region"],
        school["county"],
        school["sub_county"],
        json.dumps(details)

    ))

    conn.commit()

    return {
        **school,
        "details": details
    }


results = []

with ThreadPoolExecutor(max_workers=10) as executor:

    futures = [
        executor.submit(download_school, s)
        for s in school_ids
    ]

    for future in tqdm(as_completed(futures), total=len(futures)):
        results.append(future.result())

with open("export.json","w",encoding="utf8") as f:

    json.dump(results,f,indent=2,ensure_ascii=False)

conn.close()

print("Done!")
print("Saved to schools.db")
print("Saved to export.json")