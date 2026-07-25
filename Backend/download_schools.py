import requests
import json
import time
import urllib3

from regions import regions


urllib3.disable_warnings(
    urllib3.exceptions.InsecureRequestWarning
)


BASE_URL = "https://selection.education.go.ke/api/api/v1/filter/senior-schools"


all_schools = []
seen_ids = set()


for region, counties in regions.items():

    print(f"\n===== {region} =====")


    for county, subcounties in counties.items():

        print(f"County: {county}")


        for subcounty in subcounties:

            print(f"  {subcounty}")


            page = 1
            previous_ids = set()


            while True:

                try:

                    response = requests.get(
                        BASE_URL,
                        params={
                            "region": region,
                            "county": county,
                            "sub-county": subcounty,
                            "page": page
                        },
                        timeout=60,
                        verify=False
                    )


                    response.raise_for_status()

                    data = response.json()


                    schools = data.get(
                        "senior_schools",
                        []
                    )


                    if not schools:
                        break


                    current_ids = {
                        school["id"]
                        for school in schools
                    }


                    # API repeating same page
                    if current_ids == previous_ids:

                        print(
                            "    Same schools again. Stopping pages."
                        )

                        break


                    previous_ids = current_ids


                    added = 0


                    for school in schools:

                        sid = school["id"]


                        if sid not in seen_ids:

                            seen_ids.add(sid)

                            school["region"] = region
                            school["county"] = county
                            school["sub_county"] = subcounty


                            all_schools.append(
                                school
                            )

                            added += 1



                    print(
                        f"    Page {page}: "
                        f"{len(schools)} returned, "
                        f"+{added} new "
                        f"(Total {len(all_schools)})"
                    )


                    # If page returned less than expected,
                    # likely the final page
                    if len(schools) < 10:
                        break


                    page += 1

                    time.sleep(0.3)



                except Exception as e:

                    print(
                        "    ERROR:",
                        e
                    )

                    # move to next subcounty
                    break




with open(
    " all-schools.json",
    "w",
    encoding="utf-8"
) as f:

    json.dump(
        all_schools,
        f,
        indent=2,
        ensure_ascii=False
    )


print("\n==============================")
print(
    f"Downloaded {len(all_schools)} unique schools"
)
print("Saved as all-schools.json")
print("==============================")