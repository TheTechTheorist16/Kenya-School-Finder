import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function SchoolDetails() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [school, setSchool] = useState(null);

    useEffect(() => {

        loadSchool();

    }, []);

    async function loadSchool() {

        try {

            const response = await api.get(`/schools/${id}`);

            setSchool(response.data);

        }

        catch (err) {

            console.error(err);

        }

    }

    if (!school) {

        return <h2>Loading...</h2>;

    }

    return (

        <div className="schoolDetails">

            <button
                className="backBtn"
                onClick={() => navigate(-1)}
            >
                ← Back to Results
            </button>

            <div className="detailsCard">

                <h1>{school.name}</h1>

                <div className="detailsGrid">

                    <p><strong>📍 County:</strong> {school.county}</p>

                    <p><strong>🗺️ Sub County:</strong> {school.sub_county}</p>

                    <p><strong>⭐ Cluster:</strong> {school.cluster}</p>

                    <p><strong>👨 Gender:</strong> {school.gender}</p>

                    <p><strong>🏠 Accommodation:</strong> {school.accommodation}</p>

                    <p><strong>🏫 Institution:</strong> {school.institution_type}</p>

                </div>

                <h2>
                    Subject Combinations ({school.combinations.length})
                </h2>

                <div className="combinations">

                    {school.combinations.map(combo => (

                        <div
    className={`comboCard ${
        combo.pathway === "STEM"
            ? "stem"
            : combo.pathway === "SOCIAL SCIENCES"
            ? "social"
            : "arts"
    }`}
    key={combo.code}
>

   <span className={`pathwayBadge ${
    combo.pathway === "STEM"
        ? "stemBadge"
        : combo.pathway === "SOCIAL SCIENCES"
        ? "socialBadge"
        : "artsBadge"
}`}>
    {combo.pathway}
</span>

    <h4>{combo.code}</h4>

    <p>{combo.name}</p>

</div>
                    ))}

                </div>

            </div>

        </div>

    );

}

export default SchoolDetails;