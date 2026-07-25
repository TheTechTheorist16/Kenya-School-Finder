from sqlalchemy import Column, Integer, String, ForeignKey
from sqlalchemy.orm import relationship

from database import Base


class School(Base):
    __tablename__ = "schools"

    id = Column(Integer, primary_key=True, index=True)

    # UUID from the Ministry API
    school_id = Column(String, unique=True, index=True)

    name = Column(String, index=True)

    region = Column(String)
    county = Column(String)
    sub_county = Column(String)

    knec_code = Column(String)

    institution_type = Column(String)

    cluster = Column(String)

    category = Column(String)

    disability_type = Column(String)

    accommodation = Column(String)

    gender = Column(String)

    combinations = relationship(
        "SubjectCombination",
        back_populates="school",
        cascade="all, delete"
    )


class SubjectCombination(Base):
    __tablename__ = "subject_combinations"

    id = Column(Integer, primary_key=True, index=True)

    school_id = Column(
        String,
        ForeignKey("schools.school_id")
    )

    pathway = Column(String)          # STEM
    track = Column(String)            # PURE SCIENCES / APPLIED SCIENCES / etc.

    combination_code = Column(String)

    combination_name = Column(String)

    school = relationship(
        "School",
        back_populates="combinations"
    )