import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";


function SchoolCard({ school }) {

    const [expanded, setExpanded] = useState(false);

    const navigate = useNavigate();

    const {
        favorites,
        setFavorites
    } = useSearch();



    const isFavorite = favorites.some(
        s => s.school_id === school.school_id
    );



    function toggleFavorite() {

        if (isFavorite) {

            setFavorites(
                favorites.filter(
                    s => s.school_id !== school.school_id
                )
            );

        } else {

            setFavorites([
                ...favorites,
                school
            ]);

        }

    }



    const combinations =
        school.matching_combinations || [];



    return (

        <article className="schoolCard">


            <div className="favoriteRow">

                <button

                    className="favoriteBtn"

                    onClick={toggleFavorite}

                    title={
                        isFavorite
                        ? "Remove favorite"
                        : "Add favorite"
                    }

                >

                    {isFavorite ? "❤️" : "🤍"}

                </button>

            </div>



            <h3>{school.name}</h3>



            <div className="schoolInfo">

                <p>📍 {school.county}</p>

                <p>⭐ Cluster {school.cluster}</p>

                <p>👥 {school.gender}</p>

                <p>🏠 {school.accommodation}</p>

            </div>



            <div className="matchInfo">

                <strong>
                    {combinations.length}
                </strong>

                {" "}matching combinations

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

                    ))}


                </div>

            )}


        </article>

    );

}


export default SchoolCard;