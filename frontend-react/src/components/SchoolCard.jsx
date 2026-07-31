import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    FaHeart,
    FaRegHeart,
    FaBalanceScale,
    FaMapMarkerAlt,
    FaSchool,
    FaBed,
    FaUsers
} from "react-icons/fa";

import { useSearch } from "../context/SearchContext";

import "./SchoolCard.css";

function SchoolCard({ school }) {
console.log(school);
    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(false);

    const {
        favorites,
        setFavorites,
        compareSchools,
        setCompareSchools
    } = useSearch();

    const combinations =
        school.matching_combinations || [];

    const isFavorite =
        favorites.some(
            fav => fav.school_id === school.school_id
        );

    const isComparing =
        compareSchools.includes(
            school.school_id
        );

    function toggleFavorite() {

        if (isFavorite) {

            setFavorites(
                favorites.filter(
                    fav => fav.school_id !== school.school_id
                )
            );

        } else {

            setFavorites([
                ...favorites,
                school
            ]);

        }

    }

    function toggleCompare() {

        if (isComparing) {

            setCompareSchools(

                compareSchools.filter(

                    id => id !== school.school_id

                )

            );

            return;

        }

        if (compareSchools.length >= 4) {

            alert("Maximum of 4 schools.");

            return;

        }

        setCompareSchools([

            ...compareSchools,

            school.school_id

        ]);

    }

    return (

        <article className="schoolCard">

            <div className="cardHeader">

                <div>

                    <h2>

                        {school.name}

                    </h2>

                    <p className="schoolCode">
    KNEC Code: {school.knec_code || "N/A"}
</p>

                </div>

                <div className="scoreCircle">

                    {school.recommendation_score}

                </div>

            </div>


            <div className="progress">

                <div

                    className="progressFill"

                    style={{
                        width:
                        `${school.recommendation_score}%`
                    }}

                />

            </div>


            <div className="infoGrid">

    <div>
        <FaMapMarkerAlt />
        {school.county}
    </div>

    <div>
        <FaSchool />
        {school.category}
    </div>

    <div>
        ⭐ Cluster {school.cluster}
    </div>

    <div>
        <FaUsers />
        {school.gender}
    </div>

    <div>
        <FaBed />
        {school.accommodation}
    </div>

    <div>
        🏢 {school.institution_type}
    </div>

</div>

            <div className="matchBox">

                <strong>

                    {combinations.length}

                    {" "}Matching Subject Combinations

                </strong>

            </div>


            <div className="actionRow">

                <button

                    className="saveBtn"

                    onClick={toggleFavorite}

                >

                    {

                        isFavorite ?

                        <FaHeart />

                        :

                        <FaRegHeart />

                    }

                </button>


                <button

                    className="compareBtn"

                    onClick={toggleCompare}

                >

                    <FaBalanceScale />

                    {

                        isComparing ?

                        " Comparing"

                        :

                        " Compare"

                    }

                </button>

            </div>


            <div className="buttonGroup">

    <button
        className="detailsBtn"
        onClick={() => navigate(`/school/${school.school_id}`)}
    >
        View School
    </button>

    <button
        className="expandBtn"
        onClick={() => setExpanded(!expanded)}
    >
        {expanded
            ? "Hide Subject Combinations"
            : "Show Subject Combinations"}
    </button>

</div>


            {

                expanded &&

                <div className="comboGrid">

                    {

                        combinations.map(combo=>(

                            <div

                                className="comboCard"

                                key={combo.code}

                            >

                                <h4>

                                    {combo.code}

                                </h4>

                                <p>

                                    {combo.name}

                                </p>

                                <small>

                                    {combo.pathway}

                                </small>

                            </div>

                        ))

                    }

                </div>

            }

        </article>

    );

}

export default SchoolCard;