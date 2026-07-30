import SchoolCard from "./SchoolCard";
import SchoolCardSkeleton from "./SchoolCardSkeleton";

function Results({ schools, loading }) {

    return (

        <section className="results">

            <div className="resultsHeader">

                <h2>School Results</h2>

                {!loading && schools.length > 0 && (

                    <p>
                        {schools.length} schools found
                    </p>

                )}

            </div>


            {loading ? (

                <div className="schoolsGrid">

                    {Array.from({ length: 6 }).map((_, index) => (

                        <SchoolCardSkeleton key={index} />

                    ))}

                </div>

            ) : schools.length === 0 ? (

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