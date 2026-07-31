import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";
import api from "../services/api";

function Compare() {

    const {

        compareSchools,
        setCompareSchools

    } = useSearch();

    const [schools, setSchools] = useState([]);

    useEffect(() => {

        async function loadSchools() {

            try {

                const responses = await Promise.all(

                    compareSchools.map(id =>
                        api.get(`/schools/${id}`)
                    )

                );

                setSchools(

                    responses.map(r => r.data)

                );

            }

            catch (error) {

                console.error(error);

            }

        }

        if (compareSchools.length > 0) {

            loadSchools();

        }

        else {

            setSchools([]);

        }

    }, [compareSchools]);



    function removeSchool(id) {

        setCompareSchools(

            compareSchools.filter(

                schoolId => schoolId !== id

            )

        );

    }



    return (

        <div className="comparePage">

            <h1>⚖️ Compare Schools</h1>

            {

                schools.length === 0

                    ?

                    <p>No schools selected for comparison.</p>

                    :

                    <table className="compareTable">

                        <thead>

                            <tr>

                                <th>Feature</th>

                                {

                                    schools.map(school => (

                                        <th key={school.school_id}>

                                            {school.name}

                                        </th>

                                    ))

                                }

                            </tr>

                        </thead>

                        <tbody>

                            <tr>

                                <td>County</td>

                                {

                                    schools.map(s => (

                                        <td key={s.school_id}>

                                            {s.county}

                                        </td>

                                    ))

                                }

                            </tr>

                            <tr>

                                <td>Sub County</td>

                                {

                                    schools.map(s => (

                                        <td key={s.school_id}>

                                            {s.sub_county}

                                        </td>

                                    ))

                                }

                            </tr>

                            <tr>

                                <td>Cluster</td>

                                {

                                    schools.map(s => (

                                        <td key={s.school_id}>

                                            {s.cluster}

                                        </td>

                                    ))

                                }

                            </tr>

                            <tr>

                                <td>Gender</td>

                                {

                                    schools.map(s => (

                                        <td key={s.school_id}>

                                            {s.gender}

                                        </td>

                                    ))

                                }

                            </tr>

                            <tr>

                                <td>Accommodation</td>

                                {

                                    schools.map(s => (

                                        <td key={s.school_id}>

                                            {s.accommodation}

                                        </td>

                                    ))

                                }

                            </tr>

                            <tr>

                                <td>Institution</td>

                                {

                                    schools.map(s => (

                                        <td key={s.school_id}>

                                            {s.institution_type}

                                        </td>

                                    ))

                                }

                            </tr>

                            <tr>

                                <td>KNEC Code</td>

                                {

                                    schools.map(s => (

                                        <td key={s.school_id}>

                                            {s.knec_code || "N/A"}

                                        </td>

                                    ))

                                }

                            </tr>

                            <tr>

                                <td>Total Combinations</td>

                                {

                                    schools.map(s => (

                                        <td key={s.school_id}>

                                            {s.combinations.length}

                                        </td>

                                    ))

                                }

                            </tr>

                            <tr>

                                <td>STEM</td>

                                {

                                    schools.map(s => (

                                        <td key={s.school_id}>

                                            {s.stats?.stem ?? "-"}

                                        </td>

                                    ))

                                }

                            </tr>

                            <tr>

                                <td>Social Sciences</td>

                                {

                                    schools.map(s => (

                                        <td key={s.school_id}>

                                            {s.stats?.social ?? "-"}

                                        </td>

                                    ))

                                }

                            </tr>

                            <tr>

                                <td>Arts & Sports</td>

                                {

                                    schools.map(s => (

                                        <td key={s.school_id}>

                                            {s.stats?.arts ?? "-"}

                                        </td>

                                    ))

                                }

                            </tr>

                            <tr>

                                <td>Remove</td>

                                {

                                    schools.map(s => (

                                        <td key={s.school_id}>

                                            <button

                                                className="removeCompareBtn"

                                                onClick={() =>

                                                    removeSchool(s.school_id)

                                                }

                                            >

                                                ❌

                                            </button>

                                        </td>

                                    ))

                                }

                            </tr>

                        </tbody>

                    </table>

            }

        </div>

    );

}

export default Compare;