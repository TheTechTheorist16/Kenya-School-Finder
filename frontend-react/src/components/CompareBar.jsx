import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

function CompareBar() {

    const { compareSchools } = useSearch();

    const navigate = useNavigate();

    if (compareSchools.length === 0) {

        return null;

    }

    return (

        <div className="compareBar">

            <div>

                <strong>
                    ⚖️ {compareSchools.length} School{compareSchools.length > 1 ? "s" : ""} Selected
                </strong>

                <div className="compareNames">

                    {compareSchools.map(school => (

                        <span key={school.school_id}>

                            {school.name}

                        </span>

                    ))}

                </div>

            </div>

            <button
                className="compareNowBtn"
                onClick={() => navigate("/compare")}
            >

                Compare Now →

            </button>

        </div>

    );

}

export default CompareBar;