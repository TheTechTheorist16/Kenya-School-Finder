import { createContext, useContext, useEffect, useState } from "react";

const SearchContext = createContext();


export function SearchProvider({ children }) {

    const [selectedPathway, setSelectedPathway] = useState(null);

const [selectedTrack, setSelectedTrack] = useState(null);

const [selectedCombination, setSelectedCombination] = useState(null);

    const [favorites, setFavorites] = useState([]);
    const [compareSchools, setCompareSchools] = useState([]);

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


           setSelectedPathway(
    data.selectedPathway || null
);

setSelectedTrack(
    data.selectedTrack || null
);

setSelectedCombination(
    data.selectedCombination || null
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

    selectedPathway,

    selectedTrack,

    selectedCombination,

    schoolName,

    filters

})

        );


    }, [

        selectedCombination,

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

    selectedPathway,
    setSelectedPathway,

    selectedTrack,
    setSelectedTrack,

    selectedCombination,
    setSelectedCombination,

    favorites,
    setFavorites,

    schools,
    setSchools,

    schoolName,
    setSchoolName,

    filters,
    setFilters,

    loaded,

    compareSchools,
    setCompareSchools

}}


        >

            {children}

        </SearchContext.Provider>

    );

}



export function useSearch() {

    return useContext(SearchContext);

}