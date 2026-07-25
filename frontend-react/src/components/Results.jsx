import SchoolCard from "./SchoolCard";

function Results({ schools }) {

    return (

        <section>

            <h2>Results</h2>

            {schools.length === 0 ? (

                <div className="card">

                    No schools found.

                </div>

            ) : (

                schools.map(school => (

                    <SchoolCard
                        key={school.school_id}
                        school={school}
                    />

                ))

            )}

        </section>

    );

}

export default Results;