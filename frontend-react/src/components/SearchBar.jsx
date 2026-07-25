function SearchBar({

    schoolName,

    setSchoolName,

    onSearch

}) {

    return (

        <section className="searchBar">

            <input

                type="text"

                placeholder="🔍 Search schools..."

                value={schoolName}

                onChange={(e)=>setSchoolName(e.target.value)}

            />

            <button onClick={onSearch}>

                Search

            </button>

        </section>

    );

}

export default SearchBar;