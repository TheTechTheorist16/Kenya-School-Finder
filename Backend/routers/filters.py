from typing import List, Tuple

from fastapi import APIRouter
from sqlalchemy import Row

from database import SessionLocal
from models import School, SubjectCombination

router = APIRouter()


# -------------------------------
# Counties
# -------------------------------

@router.get("/counties")
def get_counties():

    db = SessionLocal()

    counties = (
        db.query(School.county)
        .distinct()
        .order_by(School.county)
        .all()
    )

    db.close()

    return [county[0] for county in counties if county[0]]


# -------------------------------
# Regions
# -------------------------------

@router.get("/regions")
def get_regions():

    db = SessionLocal()

    regions = (
        db.query(School.region)
        .distinct()
        .order_by(School.region)
        .all()
    )

    db.close()

    return [region[0] for region in regions if region[0]]


# -------------------------------
# Clusters
# -------------------------------

@router.get("/clusters")
def get_clusters():

    db = SessionLocal()

    clusters = (
        db.query(School.cluster)
        .distinct()
        .order_by(School.cluster)
        .all()
    )

    db.close()

    return [cluster[0] for cluster in clusters if cluster[0]]


# -------------------------------
# Sub Counties
# -------------------------------

@router.get("/sub-counties")
def get_sub_counties(county: str):

    db = SessionLocal()

    sub_counties = (
        db.query(School.sub_county)
        .filter(School.county == county)
        .distinct()
        .order_by(School.sub_county)
        .all()
    )

    db.close()

    return [sub[0] for sub in sub_counties if sub[0]]


# -------------------------------
# Genders
# -------------------------------

@router.get("/genders")
def get_genders():

    db = SessionLocal()

    genders = (
        db.query(School.gender)
        .distinct()
        .order_by(School.gender)
        .all()
    )

    db.close()

    return [gender[0] for gender in genders if gender[0]]


# -------------------------------
# Accommodation
# -------------------------------

@router.get("/accommodations")
def get_accommodations():

    db = SessionLocal()

    accommodations: List[Row[Tuple[str]]] = (
        db.query(School.accommodation)
        .distinct()
        .order_by(School.accommodation)
        .all()
    )

    db.close()

    return [item[0] for item in accommodations if item[0]]


# -------------------------------
# Institution Types
# -------------------------------

@router.get("/institution-types")
def get_institution_types():

    db = SessionLocal()

    institution_types = (
        db.query(School.institution_type)
        .distinct()
        .order_by(School.institution_type)
        .all()
    )

    db.close()

    return [item[0] for item in institution_types if item[0]]


# -------------------------------
# Pathways
# -------------------------------

@router.get("/pathways")
def get_pathways():

    db = SessionLocal()

    pathways = (
        db.query(SubjectCombination.pathway)
        .distinct()
        .order_by(SubjectCombination.pathway)
        .all()
    )

    db.close()

    return [pathway[0] for pathway in pathways if pathway[0]]