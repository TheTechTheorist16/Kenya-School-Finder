import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../services/api";

function SchoolDetails() {
const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();
    const { id } = useParams();

    const [school, setSchool] = useState(null);
    const pathwayCounts = school
    ? school.combinations.reduce((acc, combo) => {

        acc[combo.pathway] = (acc[combo.pathway] || 0) + 1;

        return acc;

    }, {})
    : {};

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
const filteredCombinations = school
    ? school.combinations.filter(combo =>

        combo.name
            .toLowerCase()
            .includes(searchTerm.toLowerCase())

        ||

        combo.code
            .toLowerCase()
            .includes(searchTerm.toLowerCase())

        ||

        combo.pathway
            .toLowerCase()
            .includes(searchTerm.toLowerCase())

    )
    : [];
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

            <h1>
                🏫 {school.name}
            </h1>

            <p>
                Senior School Profile
            </p>

        </div>




        <div className="detailsGrid">


            <div>
                📍
                <strong> County</strong>
                <span>{school.county}</span>
            </div>


            <div>
                🗺️
                <strong> Sub County</strong>
                <span>{school.sub_county}</span>
            </div>


            <div>
                ⭐
                <strong> Cluster</strong>
                <span>{school.cluster}</span>
            </div>


            <div>
                👥
                <strong> Gender</strong>
                <span>{school.gender}</span>
            </div>


            <div>
                🏠
                <strong> Accommodation</strong>
                <span>{school.accommodation}</span>
            </div>


            <div>
                🏫
                <strong> Type</strong>
                <span>{school.institution_type}</span>
            </div>


        </div>





        <div className="overviewSection">


            <div className="overviewCard stemOverview">

                <h3>🔵 STEM</h3>

                <h1>
                    {pathwayCounts["STEM"] || 0}
                </h1>

                <p>
                    Combinations
                </p>

            </div>



            <div className="overviewCard socialOverview">

                <h3>🟢 Social Sciences</h3>

                <h1>
                    {pathwayCounts["SOCIAL SCIENCES"] || 0}
                </h1>

                <p>
                    Combinations
                </p>

            </div>




            <div className="overviewCard artsOverview">

                <h3>🟠 Arts & Sports</h3>

                <h1>
                    {pathwayCounts["ARTS & SPORTS SCIENCE"] || 0}
                </h1>

                <p>
                    Combinations
                </p>

            </div>




            <div className="overviewCard totalOverview">

                <h3>📚 Total</h3>

                <h1>
                    {school.combinations.length}
                </h1>

                <p>
                    Combinations
                </p>

            </div>


        </div>





        <div className="comboSearch">


            <input className="comboInput"

                type="text"

                placeholder="🔍 Search subject combinations..."

                value={searchTerm}

                onChange={(e)=>setSearchTerm(e.target.value)}

            />


        </div>





        <h2 className="comboTitle">

            Subject Combinations ({filteredCombinations.length})

        </h2>




        <div className="combinations">


            {filteredCombinations.map(combo => (


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



                    <h4>
                        {combo.code}
                    </h4>


                    <p>
                        {combo.name}
                    </p>



                </div>


            ))}


        </div>



    </div>


</div>

);
}
export default SchoolDetails;