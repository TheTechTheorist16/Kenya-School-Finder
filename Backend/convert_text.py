import json
import re


input_file = "schools.txt"
output_file = "schools_clean.json"


schools = []


with open(input_file, "r", encoding="utf-8") as f:
    lines = f.readlines()


for line in lines:

    line = line.strip()

    # Skip empty lines and header
    if not line or line.startswith("S/No"):
        continue

    # Remove serial number
    match = re.match(r"^\d+\s+(.*)", line)

    if not match:
        continue

    data = match.group(1)


    # Find cluster position
    cluster_match = re.search(r"\s(C[1-4])\s", data)

    if not cluster_match:
        continue


    cluster = cluster_match.group(1)

    before = data[:cluster_match.start()].strip()
    after = data[cluster_match.end():].strip()


    # Split beginning section
    parts = before.split()


    try:
        region = parts[0]

        # Since your sample has multi-word regions/subcounties,
        # use the UIC and KNEC code positions

        uic_index = None

        for i, item in enumerate(parts):
            if len(item) == 4 and item.isalnum():
                if i + 1 < len(parts) and parts[i+1].isdigit():
                    uic_index = i
                    break


        if uic_index is None:
            continue


        uic = parts[uic_index]
        knec = parts[uic_index + 1]


        # Everything after KNEC and before cluster is school name
        school_name = " ".join(parts[uic_index + 2:])


        # Get region/county/subcounty
        location = parts[:uic_index]


        # This works for most cases:
        region = location[0]
        county = location[1]
        sub_county = " ".join(location[2:])


        # After cluster
        after_parts = after.split()


        school_type = after_parts[0] if len(after_parts) > 0 else ""
        disability = after_parts[1] if len(after_parts) > 1 else ""
        accommodation = after_parts[2] if len(after_parts) > 2 else ""
        gender = after_parts[3] if len(after_parts) > 3 else ""


        schools.append({
            "region": region,
            "county": county,
            "sub_county": sub_county,
            "uic": uic,
            "knec_code": knec,
            "name": school_name,
            "cluster": cluster,
            "type": school_type,
            "disability_type": disability,
            "accommodation": accommodation,
            "gender": gender
        })


    except Exception as e:
        print("Error:", line)
        print(e)



with open(output_file, "w", encoding="utf-8") as f:
    json.dump(
        schools,
        f,
        indent=4,
        ensure_ascii=False
    )


print("Finished!")
print("Schools converted:", len(schools))
print("Saved:", output_file)