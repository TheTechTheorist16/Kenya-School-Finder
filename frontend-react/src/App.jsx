import { useState } from "react";
import api from "./services/api";

import Header from "./components/Header";
import Hero from "./components/Hero";
import SearchBar from "./components/SearchBar";
import SubjectSelector from "./components/SubjectSelector";
import Filters from "./components/Filters";
import Results from "./components/Results";
import Statistics from "./components/Statistics";

function App() {
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

            console.log("Searching with:");
            console.log(selectedSubjects);
            console.log("School Name:", schoolName);
            console.log("County:", filters.county);

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
                },
            });

            setSchools(response.data);
        } catch (error) {
            console.error("Failed to search schools:", error);
            setSchools([]);
        }

    }

    return (

        <div>

            <Header />

            <Hero />
            <Statistics/>

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
    setCounty={(county) =>
        setFilters((current) => ({
            ...current,
            county,
        }))
    }

    gender={filters.gender}
    setGender={(gender) =>
        setFilters((current) => ({
            ...current,
            gender,
        }))
    }

    accommodation={filters.accommodation}
    setAccommodation={(accommodation) =>
        setFilters((current) => ({
            ...current,
            accommodation,
        }))
    }

    cluster={filters.cluster}
    setCluster={(cluster) =>
        setFilters((current) => ({
            ...current,
            cluster,
        }))
    }

    institutionType={filters.institutionType}
    setInstitutionType={(institutionType) =>
        setFilters((current) => ({
            ...current,
            institutionType,
        }))
    }

    subCounty={filters.sub_county}
    setSubCounty={(sub_county) =>
        setFilters((current) => ({
            ...current,
            sub_county,
        }))
    }
/>
    

                
            

            <Results schools={schools} />

        </div>

    );

}

export default App;