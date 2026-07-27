import { useSearch } from "../context/SearchContext";
import api from "../services/api";
import { useEffect, useRef } from "react";
import { useState } from "react";
import TrackSelector from "../components/TrackSelector";

import Hero from "../components/Hero";
import PathwaySelector from "../components/PathwaySelector";
import Filters from "../components/Filters";
import Results from "../components/Results";
import CompareBar from "../components/CompareBar";
import Statistics from "../components/Statistics";
import CombinationSelector from "../components/CombinationSelector";


function Home() {
const [selectedPathway, setSelectedPathway] = useState(null);
const [selectedTrack, setSelectedTrack] = useState(null);
const [combinations, setCombinations] = useState([]);
useEffect(()=>{

    if(!selectedTrack) return;


    async function loadCombinations(){

        try{

            const response = await api.get(
                "/subject-combinations",
                {
                    params:{
                        track:selectedTrack
                    }
                }
            );


            setCombinations(response.data);


        }catch(error){

            console.error(error);

            setCombinations([]);

        }

    }


    loadCombinations();


},[selectedTrack]);
const [selectedCombination, setSelectedCombination] = useState(null);

    const {

        selectedSubjects,
        setSelectedSubjects,

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
                params: {
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

        try {

            const response = await api.get("/search", {

                params: {

                    subjects: selectedSubjects,

                    school_name: schoolName,

                    county: filters.county,

                    sub_county: filters.sub_county,

                    gender: filters.gender,

                    cluster: filters.cluster,

                    accommodation: filters.accommodation,

                    institution_type: filters.institutionType,
                    combination_code: selectedCombination?.code,

                }

            });


            setSchools(response.data);


        } catch (error) {

            console.error("Search failed:", error);

            setSchools([]);

        }

    }




    useEffect(() => {

        if (!loaded) return;


        const hasSearch =

            selectedSubjects.length > 0 ||

            schoolName ||

            filters.county ||

            filters.gender ||

            filters.cluster ||

            filters.accommodation ||

            filters.institutionType ||

            filters.sub_county;



        if (hasSearch) {

            searchSchools();

        }


    }, [loaded]);





    return (

        <>


            <Hero

                searchTerm={schoolName}

                setSearchTerm={setSchoolName}

                handleSearch={searchSchools}

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

        setSelectedCombination(null);

        loadCombinations(track);

    }}

/>
<CombinationSelector

    combinations={combinations}

    onSelect={(combo)=>{

        setSelectedCombination(combo);

        searchSchools();

    }}

/>





            <Filters


                county={filters.county}

                setCounty={(county) =>
                    setFilters({
                        ...filters,
                        county
                    })
                }



                gender={filters.gender}

                setGender={(gender) =>
                    setFilters({
                        ...filters,
                        gender
                    })
                }




                accommodation={filters.accommodation}

                setAccommodation={(accommodation) =>
                    setFilters({
                        ...filters,
                        accommodation
                    })
                }




                cluster={filters.cluster}

                setCluster={(cluster) =>
                    setFilters({
                        ...filters,
                        cluster
                    })
                }




                institutionType={filters.institutionType}

                setInstitutionType={(institutionType) =>
                    setFilters({
                        ...filters,
                        institutionType
                    })
                }




                subCounty={filters.sub_county}

                setSubCounty={(sub_county) =>
                    setFilters({
                        ...filters,
                        sub_county
                    })
                }


            />

<Statistics />

            <Results schools={schools} />
            <CompareBar />

        </>

    );

}


export default Home;