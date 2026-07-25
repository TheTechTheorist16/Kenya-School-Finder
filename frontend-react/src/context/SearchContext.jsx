import { createContext, useContext, useState } from "react";

const SearchContext = createContext();

export function SearchProvider({ children }) {

    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const [schools, setSchools] = useState([]);

    const [schoolName, setSchoolName] = useState("");

    const [filters, setFilters] = useState({

        county: "",
        gender: "",
        cluster: "",
        accommodation: "",
        institutionType: "",
        sub_county: ""

    });

    return (

        <SearchContext.Provider

            value={{

                selectedSubjects,
                setSelectedSubjects,

                schools,
                setSchools,

                schoolName,
                setSchoolName,

                filters,
                setFilters

            }}

        >

            {children}

        </SearchContext.Provider>

    );

}

export function useSearch() {
console.log("SearchProvider rendered");
    return useContext(SearchContext);

}