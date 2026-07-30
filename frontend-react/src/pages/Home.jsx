import { useSearch } from "../context/SearchContext";
import api from "../services/api";
import { useEffect, useState } from "react";

import Hero from "../components/Hero";
import PathwaySelector from "../components/PathwaySelector";
import TrackSelector from "../components/TrackSelector";
import CombinationSelector from "../components/CombinationSelector";
import Filters from "../components/Filters";
import Results from "../components/Results";
import CompareBar from "../components/CompareBar";
import Statistics from "../components/Statistics";


function Home() {

    const [selectedPathway, setSelectedPathway] = useState(null);

    const [selectedTrack, setSelectedTrack] = useState(null);

    const [combinations, setCombinations] = useState([]);

    const [selectedCombination, setSelectedCombination] = useState(null);
    const [loading, setLoading] = useState(false);


    const {

    schools,
    setSchools,

    schoolName,
    setSchoolName,

    filters,
    setFilters,

    loaded

} = useSearch();

    


    async function loadCombinations(track) {

        try {

            const response = await api.get(
                "/subject-combinations",
                {
                    params:{
                        track
                    }
                }
            );


            setCombinations(response.data);


        } catch(error) {

            console.error(
                "Failed loading combinations:",
                error
            );


            setCombinations([]);

        }

    }



   async function searchSchools() {

    setLoading(true);

    try {

        const response = await api.get(
            "/search",
            {
                params: {
                    pathway: selectedPathway,
                    track: selectedTrack,
                    combination_code: selectedCombination?.code,
                    school_name: schoolName,
                    county: filters.county,
                    sub_county: filters.sub_county,
                    gender: filters.gender,
                    cluster: filters.cluster,
                    accommodation: filters.accommodation,
                    institution_type: filters.institutionType
                }
            }
        );

        setSchools(response.data);

    } catch (error) {

        console.error("Search failed:", error);

        setSchools([]);

    } finally {

        setLoading(false);

    }

}



    // Load combinations when track changes
    useEffect(()=>{

        if(selectedTrack){

            loadCombinations(selectedTrack);

        }
        else{

            setCombinations([]);

        }


        setSelectedCombination(null);


    },[selectedTrack]);



    // Search when combination changes
    useEffect(()=>{

        if(selectedCombination){

            searchSchools();

        }


    },[selectedCombination]);



   // -------------------------------
// Load combinations when track changes
// -------------------------------
useEffect(() => {

    if (selectedTrack) {

        loadCombinations(selectedTrack);

    } else {

        setCombinations([]);

    }

    setSelectedCombination(null);

}, [selectedTrack]);


// -------------------------------
// Search when a combination is selected
// -------------------------------
useEffect(() => {

    if (!selectedCombination) return;

    searchSchools();

}, [selectedCombination]);


// -------------------------------
// NO automatic search on page load
// -------------------------------





    return (

        <>


           <Hero

    searchTerm={schoolName}

    setSearchTerm={setSchoolName}

    handleSearch={searchSchools}

    loading={loading}

/>



            <PathwaySelector

                onSelect={(pathway)=>{

                    setSelectedPathway(pathway);

                    setSelectedTrack(null);

                }}

            />



            <TrackSelector

                pathway={selectedPathway}

                onSelect={(track)=>{

                    setSelectedTrack(track);

                }}

            />



            <CombinationSelector

                combinations={combinations}

                onSelect={(combo)=>{

                    setSelectedCombination(combo);

                }}

            />




            <Filters


                county={filters.county}

                setCounty={(county)=>

                    setFilters({

                        ...filters,

                        county

                    })

                }



                gender={filters.gender}

                setGender={(gender)=>

                    setFilters({

                        ...filters,

                        gender

                    })

                }



                accommodation={filters.accommodation}

                setAccommodation={(accommodation)=>

                    setFilters({

                        ...filters,

                        accommodation

                    })

                }



                cluster={filters.cluster}

                setCluster={(cluster)=>

                    setFilters({

                        ...filters,

                        cluster

                    })

                }



                institutionType={filters.institutionType}

                setInstitutionType={(institutionType)=>

                    setFilters({

                        ...filters,

                        institutionType

                    })

                }



                subCounty={filters.sub_county}

                setSubCounty={(sub_county)=>

                    setFilters({

                        ...filters,

                        sub_county

                    })

                }


            />



            <Statistics />


          <Results
    schools={schools}
    loading={loading}
/>


            <CompareBar />


        </>

    );

}


export default Home;