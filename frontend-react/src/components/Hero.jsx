function Hero({ searchTerm, setSearchTerm, handleSearch }) {

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


                <button onClick={handleSearch}>

                    Find Schools

                </button>


            </div>


        </section>

    );

}

export default Hero;