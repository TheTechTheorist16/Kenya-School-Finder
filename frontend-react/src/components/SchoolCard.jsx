import { useState } from "react";

import { useNavigate } from "react-router-dom";

function SchoolCard({ school }) {

    const [expanded, setExpanded] = useState(false);
const navigate = useNavigate();
    return (

        <div className="schoolCard">

            <h3>{school.name}</h3>

            <div className="schoolInfo">

                <p>📍 {school.county}</p>

                <p>⭐ {school.cluster}</p>

                <p>👨 {school.gender}</p>

                <p>🏠 {school.accommodation}</p>
                <p><strong>ID:</strong> {school.school_id}</p>

            </div>

            <p>

                <strong>
                    {school.matching_combinations.length}
                </strong>

                {" "}matching subject combinations

            </p>

            <div className="buttonGroup">

    <button
        className="viewBtn"
        onClick={() => setExpanded(!expanded)}
    >
        {expanded
            ? "▲ Hide Subject Combinations"
            : "▼ View Subject Combinations"}
    </button>

    <button
        className="detailsBtn"
        onClick={() => navigate(`/school/${school.school_id}`)}
    >
        View School →
    </button>

</div>
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