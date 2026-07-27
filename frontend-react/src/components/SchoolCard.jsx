import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

function SchoolCard({ school }) {

    const navigate = useNavigate();

    const [expanded, setExpanded] = useState(false);

    const {
        favorites,
        setFavorites,
        compareSchools,
        setCompareSchools
    } = useSearch();

    const combinations = school.matching_combinations || [];

    const isFavorite = favorites.some(
        favorite => favorite.school_id === school.school_id
    );

    const isComparing = compareSchools.includes(
        school.school_id
    );

    function toggleFavorite() {

        if (isFavorite) {

            setFavorites(
                favorites.filter(
                    favorite =>
                        favorite.school_id !== school.school_id
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

            alert("You can compare up to 4 schools.");

            return;

        }

        setCompareSchools([
            ...compareSchools,
            school.school_id
        ]);

    }

    return (

    <article className="schoolCard">


        <div className="cardTop">

            <div>

                <h3 className="schoolName">
                    {school.name}
                </h3>

                <p className="location">
                    📍 {school.county}
                </p>

            </div>


            <div className="scoreBadge">
                ⭐ {school.recommendation_score ?? 0}
            </div>

        </div>



        <div className="badges">

            {school.accommodation && (
                <span className="badge">
                    🏫 {school.accommodation}
                </span>
            )}


            {school.gender && (
                <span className="badge">
                    👥 {school.gender}
                </span>
            )}


            {school.category && (
                <span className="badge">
                    🟦 {school.category}
                </span>
            )}


            {school.cluster && (
                <span className="badge">
                    ⭐ Cluster {school.cluster}
                </span>
            )}

        </div>



        <div className="pathwayBox">

            <small>
                Pathway
            </small>


            <strong>
                {combinations.length} matching combinations
            </strong>

        </div>




        <div className="cardActions">


            <button
                className="favoriteBtn"
                onClick={toggleFavorite}
            >
                {isFavorite ? "❤️ Saved" : "🤍 Save"}
            </button>



            <button
                className="compareBtn"
                onClick={toggleCompare}
            >
                {isComparing
                    ? "✓ Comparing"
                    : "⚖️ Compare"}
            </button>


        </div>



        <div className="buttonGroup">


            <button
                className="viewBtn"
                onClick={() =>
                    setExpanded(!expanded)
                }
            >

                {expanded
                    ? "▲ Hide combinations"
                    : "▼ View combinations"}

            </button>



            <button
                className="detailsBtn"
                onClick={() =>
                    navigate(`/school/${school.school_id}`)
                }
            >

                View School →

            </button>


        </div>



        {expanded && (

            <div className="combinations">

                {combinations.map(combo => (

                    <div
                        key={combo.code}
                        className="comboCard"
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

                ))}

            </div>

        )}


    </article>
    )
}
export default SchoolCard;