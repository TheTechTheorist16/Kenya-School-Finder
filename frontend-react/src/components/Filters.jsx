import { useEffect, useState } from "react";
import api from "../services/api";

function Filters({

    county,
    setCounty,

    gender,
    setGender,

    accommodation,
    setAccommodation,

    cluster,
    setCluster,

    institutionType,
    setInstitutionType,

    subCounty,
    setSubCounty,

}) {

    const [counties, setCounties] = useState([]);
    const [clusters, setClusters] = useState([]);
    const [institutionTypes, setInstitutionTypes] = useState([]);
    const [subCounties, setSubCounties] = useState([]);

    useEffect(() => {

        loadCounties();
        loadClusters();
        loadInstitutionTypes();

    }, []);
    useEffect(() => {

    loadSubCounties(county);

}, [county]);

    async function loadCounties() {

        try {

            const response = await api.get("/counties");

            setCounties(response.data);

        } catch (err) {

            console.error(err);

        }

    }
    async function loadSubCounties(county) {

    if (!county) {

        setSubCounties([]);
        return;

    }

    try {

        const response = await api.get("/sub-counties", {
            params: {
                county: county
            }
        });

        setSubCounties(response.data);

    } catch (err) {

        console.error(err);

    }

}
    async function loadClusters() {

    try {

        const response = await api.get("/clusters");

        setClusters(response.data);

    } catch (err) {

        console.error(err);

    }
}

    async function loadInstitutionTypes() {

    try {

        const response = await api.get("/institution-types");

        setInstitutionTypes(response.data);

    } catch (err) {

        console.error(err);

    }

}

    return (

        <section>

            <h2>Filters</h2>

            <div className="filtersGrid">

                <label className="filterCard">

   <span>📍 County</span>

    <select
        value={county}
        onChange={(e) => setCounty(e.target.value)}
    >

        <option value="">
            Any County
        </option>

        {counties.map(c => (

            <option
                key={c}
                value={c}
            >
                {c}
            </option>

        ))}

    </select>

</label>
                <label className="filterCard">

    <span>👥 Gender</span>

    <select
        value={gender}
        onChange={(e) => setGender(e.target.value)}
    >

        <option value="">
            Any Gender
        </option>

        <option value="BOYS">
            Boys
        </option>

        <option value="GIRLS">
            Girls
        </option>

        <option value="MIXED">
            Mixed
        </option>

    </select>

</label>
<label className="filterCard">

    <span>🛏️ Accommodation</span>

    <select
        value={accommodation}
        onChange={(e) => setAccommodation(e.target.value)}
    >

        <option value="">Any</option>
        <option value="BOARDING">Boarding</option>
        <option value="DAY">Day</option>

    </select>

</label>
<label className="filterCard">

   <span>⭐ Cluster</span>

    <select
        value={cluster}
        onChange={(e) => setCluster(e.target.value)}
    >

        <option value="">
            Any Cluster
        </option>

        {clusters.map(c => (

            <option
                key={c}
                value={c}
            >

                {c}

            </option>

        ))}

    </select>

</label>

<label className="filterCard">

    <span>🏫 Institution Type</span>

    <select
        value={institutionType}
        onChange={(e) => setInstitutionType(e.target.value)}
    >

        <option value="">
            Any Institution Type
        </option>

        {institutionTypes.map(type => (
            <option
    key={type}
    value={type}
>
    {type.charAt(0) + type.slice(1).toLowerCase()}
</option>
        ))}

        

    </select>

</label>
<label className="filterCard">

    <span>🗺️ Sub-county</span>

    <select
        value={subCounty}
        onChange={(e) => setSubCounty(e.target.value)}
        
    > 
    <option value="">Any Sub-county</option>

    {subCounties.map(sub => (
        <option
            key={sub}
            value={sub}
        >
            {sub}
        </option>
    ))}

    </select>

</label>

            </div>

        </section>

    );

}

export default Filters;