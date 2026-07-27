from models import School


def calculate_score(school: School, matching):

    score = 0

    # Matching combinations
    score += min(len(matching), 40)

    stem = sum(
        1
        for combo in school.combinations
        if combo.pathway and "stem" in combo.pathway.lower()
    )

    social = sum(
        1
        for combo in school.combinations
        if combo.pathway and "social" in combo.pathway.lower()
    )

    arts = sum(
        1
        for combo in school.combinations
        if combo.pathway and "arts" in combo.pathway.lower()
    )

    score += min(stem // 2, 15)
    score += min(social // 3, 8)
    score += min(arts // 3, 7)

    cluster_bonus = {
        "C1": 20,
        "C2": 16,
        "C3": 12,
        "C4": 8,
        "C5": 4,
    }

    score += cluster_bonus.get(school.cluster, 0)

    if school.institution_type == "PRIVATE":
        score += 5

    return min(score, 100)