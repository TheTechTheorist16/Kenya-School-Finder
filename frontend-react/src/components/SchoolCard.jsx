import { useState } from "react";

function SchoolCard({ school }) {

    const [expanded, setExpanded] = useState(false);

    return (

        <div className="schoolCard">

            <h3>{school.name}</h3>

            <div className="schoolInfo">

                <p>📍 {school.county}</p>

                <p>⭐ {school.cluster}</p>

                <p>👨 {school.gender}</p>

                <p>🏠 {school.accommodation}</p>

            </div>

            <p>

                <strong>
                    {school.matching_combinations.length}
                </strong>

                {" "}matching subject combinations

            </p>

            <button
                className="viewBtn"
                onClick={() => setExpanded(!expanded)}
            >

                {expanded
                    ? "▲ Hide Subject Combinations"
                    : "▼ View Subject Combinations"}

            </button>

            {expanded && (

                <div className="combinations">

                    {school.matching_combinations.map(combo => (

                        <div
                            className="comboCard"
                            key={combo.code}
                        >

                            <h4>{combo.code}</h4>

                            <p>{combo.name}</p>

                            <small>{combo.pathway}</small>

                        </div>

                    ))}

                </div>

            )}

        </div>

    );

}

export default SchoolCard;