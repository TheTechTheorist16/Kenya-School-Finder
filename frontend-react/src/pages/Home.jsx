import { useState } from "react";
import api from "../services/api";

import Hero from "../components/Hero";
import SearchBar from "../components/SearchBar";
import SubjectSelector from "../components/SubjectSelector";
import Filters from "../components/Filters";
import Results from "../components/Results";

function Home() {

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
                    institution_type: filters.institutionType
                }

            });

            setSchools(response.data);

        } catch {

            setSchools([]);

        }

    }

    return (

        <>

            <Hero />

            <SearchBar
                schoolName={schoolName}
                setSchoolName={setSchoolName}
                onSearch={searchSchools}
            />

            <SubjectSelector
                selectedSubjects={selectedSubjects}
                setSelectedSubjects={setSelectedSubjects}
            />

            <Filters
                county={filters.county}
                setCounty={(county)=>setFilters({...filters,county})}

                gender={filters.gender}
                setGender={(gender)=>setFilters({...filters,gender})}

                accommodation={filters.accommodation}
                setAccommodation={(accommodation)=>setFilters({...filters,accommodation})}

                cluster={filters.cluster}
                setCluster={(cluster)=>setFilters({...filters,cluster})}

                institutionType={filters.institutionType}
                setInstitutionType={(institutionType)=>
                    setFilters({...filters,institutionType})
                }

                subCounty={filters.sub_county}
                setSubCounty={(sub_county)=>
                    setFilters({...filters,sub_county})
                }
            />

            <Results schools={schools}/>

        </>

    );

}

export default Home;