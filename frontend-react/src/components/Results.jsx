import SchoolCard from "./SchoolCard";

function Results({ schools }) {

    return (

        <section className="results">

            <div className="resultsHeader">

                <h2>School Results</h2>

                {schools.length > 0 && (

                    <p>
                        {schools.length} schools found
                    </p>

                )}

            </div>



            {schools.length === 0 ? (

                <div className="emptyCard">

                    <h3>No schools found</h3>

                    <p>
                        Try changing your filters or search terms.
                    </p>

                </div>

            ) : (

                <div className="schoolsGrid">

                    {schools.map((school) => (

                        <SchoolCard

                            key={school.school_id}

                            school={school}

                        />

                    ))}

                </div>

            )}

        </section>

    );

}

export default Results;