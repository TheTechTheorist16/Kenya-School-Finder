from models import School


def get_school_stats(school: School):

    stem = 0
    social = 0
    arts = 0

    for combo in school.combinations:

        pathway = (combo.pathway or "").lower()

        if "stem" in pathway:
            stem += 1

        elif "social" in pathway:
            social += 1

        elif "arts" in pathway:
            arts += 1

    return {
        "stem": stem,
        "social": social,
        "arts": arts,
        "total": len(school.combinations)
    }