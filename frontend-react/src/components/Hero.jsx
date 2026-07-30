import { AiOutlineLoading3Quarters } from "react-icons/ai";
function Hero({
    searchTerm,
    setSearchTerm,
    handleSearch,
    loading
}) {

    return (

        <section className="hero">

            <h2>
                Find Your Dream Senior School
            </h2>


            <p>
                Search thousands of subject combinations from schools across Kenya.
            </p>


            <div className="searchBar">

                <input

                    type="text"

                    placeholder="🔍 Search schools, counties, or subject combinations..."

                    value={searchTerm}

                    onChange={(e) => setSearchTerm(e.target.value)}

                />


                <button
    onClick={handleSearch}
    disabled={loading}
>

    {loading ? (
        <>
            <AiOutlineLoading3Quarters className="loadingIcon" />
            Searching...
        </>
    ) : (
        "Find Schools"
    )}

</button>


            </div>


        </section>

    );

}

export default Hero;