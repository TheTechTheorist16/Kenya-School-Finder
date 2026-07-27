import { useEffect, useState } from "react";
import { useSearch } from "../context/SearchContext";
import api from "../services/api";


function calculateMatch(school, selectedSubjects) {

    if (selectedSubjects.length === 0) return 0;


    const offeredSubjects = new Set();


    school.combinations.forEach(combo => {

        combo.name
            .split(",")
            .forEach(subject => {

                offeredSubjects.add(
                    subject.trim().toLowerCase()
                );

            });

    });


    const matched = selectedSubjects.filter(subject =>

        offeredSubjects.has(
            subject.trim().toLowerCase()
        )

    ).length;


    return Math.round(
        (matched / selectedSubjects.length) * 100
    );

}



function Compare() {


    const {
        compareSchools,
        setCompareSchools,
        selectedSubjects
    } = useSearch();



    const [schools, setSchools] = useState([]);



    function removeSchool(id) {

        setCompareSchools(

            compareSchools.filter(
                schoolId => schoolId !== id
            )

        );

    }




    const bestSchool = schools.length > 0

        ? schools.reduce((best, current) => {

            const currentScore =
                calculateMatch(
                    current,
                    selectedSubjects
                );


            const bestScore =
                calculateMatch(
                    best,
                    selectedSubjects
                );


            return currentScore > bestScore
                ? current
                : best;


        })

        : null;





    useEffect(() => {


        async function loadSchools() {


            try {


                const responses = await Promise.all(

                    compareSchools.map(id =>

                        api.get(`/schools/${id}`)

                    )

                );


                setSchools(

                    responses.map(
                        response => response.data
                    )

                );


            }

            catch(error) {

                console.error(
                    "Failed loading comparison schools",
                    error
                );

            }


        }



        if(compareSchools.length > 0) {


            loadSchools();


        }

        else {


            setSchools([]);


        }


    }, [compareSchools]);





    return (

        <div className="comparePage">


            <h1>
                ⚖️ Compare Schools
            </h1>



            {
                bestSchool && (

                    <div className="bestSchoolCard">


                        <h2>
                            🏆 Recommended School
                        </h2>


                        <h3>
                            {bestSchool.name}
                        </h3>


                        <p>
                            🎯 
                            {
                                calculateMatch(
                                    bestSchool,
                                    selectedSubjects
                                )
                            }%
                            Match
                        </p>



                        <ul>

                            <li>
                                ✅ Best subject match
                            </li>


                            <li>
                                📚 
                                {bestSchool.combinations.length}
                                combinations
                            </li>


                            <li>
                                🏠 {bestSchool.accommodation}
                            </li>


                            <li>
                                🏫 {bestSchool.institution_type}
                            </li>


                        </ul>


                    </div>

                )
            }






            {
                schools.length === 0 ? (

                    <p>
                        No schools selected for comparison.
                    </p>

                )

                :

                (

                <>


                <section className="matchSection">


                    <h2>
                        🎯 Subject Match
                    </h2>



                    {
                        schools.map(school => {


                            const score =
                                calculateMatch(
                                    school,
                                    selectedSubjects
                                );



                            const offeredSubjects =
                                new Set();



                            school.combinations.forEach(combo => {


                                combo.name
                                .split(",")
                                .forEach(subject => {


                                    offeredSubjects.add(

                                        subject
                                        .trim()
                                        .toLowerCase()

                                    );


                                });


                            });




                            return (

                            <div
                                className="matchCard"
                                key={school.school_id}
                            >


                                <div className="matchHeader">


                                    <h3>
                                        {school.name}
                                    </h3>


                                    <span className="matchBadge">

                                        {score}% Match

                                    </span>


                                </div>





                                <div className="progressBar">


                                    <div

                                        className="progressFill"

                                        style={{
                                            width:`${score}%`
                                        }}

                                    />


                                </div>





                                <div className="subjectChecklist">


                                    {
                                        selectedSubjects.map(subject => {


                                            const found =
                                                offeredSubjects.has(
                                                    subject
                                                    .toLowerCase()
                                                );



                                            return (

                                                <div

                                                    className="subjectStatus"

                                                    key={subject}

                                                >

                                                    {
                                                        found
                                                        ? "✅"
                                                        : "❌"
                                                    }

                                                    {" "}
                                                    {subject}

                                                </div>

                                            );


                                        })
                                    }


                                </div>



                            </div>

                            );


                        })
                    }


                </section>






                <h2>
                    🏫 School Comparison
                </h2>




                <div className="comparisonGrid">


                {
                    schools.map(school => (

                    <div

                        key={school.school_id}

                        className="schoolCard"

                    >


                        <button

                            className="removeCompareBtn"

                            onClick={() =>
                                removeSchool(
                                    school.school_id
                                )
                            }

                        >

                            ❌ Remove

                        </button>




                        <h3>
                            {school.name}
                        </h3>



                        <p>
                            📍 {school.county}
                        </p>


                        <p>
                            ⭐ Cluster {school.cluster}
                        </p>


                        <p>
                            👥 {school.gender}
                        </p>


                        <p>
                            🏠 {school.accommodation}
                        </p>


                        <p>
                            📚 
                            {school.combinations.length}
                            Subject Combinations
                        </p>


                        <p>

                            🎯 
                            {
                                calculateMatch(
                                    school,
                                    selectedSubjects
                                )
                            }%
                            Match

                        </p>


                    </div>

                    ))
                }


                </div>



                </>

                )

            }



        </div>

    );

}


export default Compare;