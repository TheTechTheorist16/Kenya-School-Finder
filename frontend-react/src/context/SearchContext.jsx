import { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext();


export function SearchProvider({ children }) {

    const [selectedSubjects, setSelectedSubjects] = useState([]);

    const [favorites, setFavorites] = useState([]);

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


    const [loaded, setLoaded] = useState(false);



    // Load saved data
    useEffect(() => {

        const savedSearch = localStorage.getItem("searchState");


        if (savedSearch) {

            const data = JSON.parse(savedSearch);


            setSelectedSubjects(
                data.selectedSubjects || []
            );


            setSchoolName(
                data.schoolName || ""
            );


            setFilters(
                data.filters || {

                    county: "",
                    gender: "",
                    cluster: "",
                    accommodation: "",
                    institutionType: "",
                    sub_county: ""

                }
            );

        }



        const savedFavorites = localStorage.getItem("favorites");


        if (savedFavorites) {

            setFavorites(
                JSON.parse(savedFavorites)
            );

        }


        setLoaded(true);


    }, []);



    // Save search
    useEffect(() => {

        if (!loaded) return;


        localStorage.setItem(

            "searchState",

            JSON.stringify({

                selectedSubjects,

                schoolName,

                filters

            })

        );


    }, [

        selectedSubjects,

        schoolName,

        filters,

        loaded

    ]);



    // Save favorites
    useEffect(() => {

        if (!loaded) return;


        localStorage.setItem(

            "favorites",

            JSON.stringify(favorites)

        );


    }, [favorites, loaded]);



    return (

        <SearchContext.Provider

            value={{

                selectedSubjects,
                setSelectedSubjects,

                favorites,
                setFavorites,

                schools,
                setSchools,

                schoolName,
                setSchoolName,

                filters,
                setFilters,

                loaded

            }}

        >

            {children}

        </SearchContext.Provider>

    );

}



export function useSearch() {

    return useContext(SearchContext);

}