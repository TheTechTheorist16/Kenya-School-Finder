import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function SchoolDetails() {

    const navigate = useNavigate();
    const { id } = useParams();

    const [school, setSchool] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");

    useEffect(() => {
        loadSchool();
    }, []);

    async function loadSchool() {

        try {

            const response = await api.get(`/schools/${id}`);

            setSchool(response.data);

        } catch (err) {

            console.error(err);

        }

    }

    if (!school) {

        return <h2>Loading...</h2>;

    }

    const pathwayCounts = school.combinations.reduce((acc, combo) => {

        acc[combo.pathway] = (acc[combo.pathway] || 0) + 1;

        return acc;

    }, {});

    const filteredCombinations = school.combinations.filter(combo =>

        combo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||

        combo.code.toLowerCase().includes(searchTerm.toLowerCase()) ||

        combo.pathway.toLowerCase().includes(searchTerm.toLowerCase())

    );

    const groupedCombinations = filteredCombinations.reduce((groups, combo) => {

        if (!groups[combo.pathway]) {

            groups[combo.pathway] = [];

        }

        groups[combo.pathway].push(combo);

        return groups;

    }, {});

    return (

        <div className="schoolDetails">

            <button
                className="backBtn"
                onClick={() => navigate(-1)}
            >
                ← Back to Results
            </button>

            <div className="detailsCard">

                <div className="schoolTitle">

                    <h1>🏫 {school.name}</h1>

                    <p>Senior School Profile</p>

                </div>


                <div className="detailsGrid">

                    <div>

                        📍 <strong>County</strong>

                        <span>{school.county}</span>

                    </div>

                    <div>

                        🗺️ <strong>Sub County</strong>

                        <span>{school.sub_county}</span>

                    </div>

                    <div>

                        ⭐ <strong>Cluster</strong>

                        <span>{school.cluster}</span>

                    </div>

                    <div>

                        👥 <strong>Gender</strong>

                        <span>{school.gender}</span>

                    </div>

                    <div>

                        🏠 <strong>Accommodation</strong>

                        <span>{school.accommodation}</span>

                    </div>

                    <div>

                        🏫 <strong>Institution Type</strong>

                        <span>{school.institution_type}</span>

                    </div>

                </div>


                <div className="overviewSection">

                    <div className="overviewCard stemOverview">

                        <h3>🔵 STEM</h3>

                        <h1>{pathwayCounts["STEM"] || 0}</h1>

                        <p>Combinations</p>

                    </div>

                    <div className="overviewCard socialOverview">

                        <h3>🟢 Social Sciences</h3>

                        <h1>{pathwayCounts["SOCIAL SCIENCES"] || 0}</h1>

                        <p>Combinations</p>

                    </div>

                    <div className="overviewCard artsOverview">

                        <h3>🟠 Arts & Sports</h3>

                        <h1>{pathwayCounts["ARTS & SPORTS SCIENCE"] || 0}</h1>

                        <p>Combinations</p>

                    </div>

                    <div className="overviewCard totalOverview">

                        <h3>📚 Total</h3>

                        <h1>{school.combinations.length}</h1>

                        <p>Combinations</p>

                    </div>

                </div>


                <div className="comboSearch">

                    <input

                        className="comboInput"

                        type="text"

                        placeholder="🔍 Search subject combinations..."

                        value={searchTerm}

                        onChange={(e) => setSearchTerm(e.target.value)}

                    />

                </div>


                <h2 className="comboTitle">

                    Subject Combinations ({filteredCombinations.length})

                </h2>


                <div className="combinations">

                    {Object.entries(groupedCombinations).map(([pathway, combos]) => (

                        <div
                            key={pathway}
                            className="pathwaySection"
                        >

                            <h2
                                className={`pathwayHeading ${
                                    pathway === "STEM"
                                        ? "stemHeading"
                                        : pathway === "SOCIAL SCIENCES"
                                        ? "socialHeading"
                                        : "artsHeading"
                                }`}
                            >

                                {pathway}

                                <span> ({combos.length})</span>

                            </h2>

                            <div className="comboGrid">

                                {combos.map((combo) => (

                                    <div

                                        key={combo.code}

                                        className={`comboCard ${
                                            pathway === "STEM"
                                                ? "stem"
                                                : pathway === "SOCIAL SCIENCES"
                                                ? "social"
                                                : "arts"
                                        }`}

                                    >

                                        <span
                                            className={`pathwayBadge ${
                                                pathway === "STEM"
                                                    ? "stemBadge"
                                                    : pathway === "SOCIAL SCIENCES"
                                                    ? "socialBadge"
                                                    : "artsBadge"
                                            }`}
                                        >

                                            {pathway}

                                        </span>

                                        <h4>{combo.code}</h4>

                                        <p>{combo.name}</p>

                                    </div>

                                ))}

                            </div>

                        </div>

                    ))}

                </div>

            </div>

        </div>

    );

}

export default SchoolDetails;