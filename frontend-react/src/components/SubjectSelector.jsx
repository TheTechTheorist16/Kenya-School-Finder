import { useEffect, useState } from "react";

import api from "../services/api";

const icons = {

    "Biology":"🧬",
    "Chemistry":"🧪",
    "Physics":"⚛",
    "Mathematics":"➗",
    "English":"📖",
    "Geography":"🌍",
    "History":"📜",
    "Computer Studies":"💻",
    "Agriculture":"🌱",
    "Business Studies":"💼"

};
function SubjectSelector({
    selectedSubjects,
    setSelectedSubjects
}) {
    const [subjects, setSubjects] = useState([]);
    
function toggleSubject(subject) {

    if (selectedSubjects.includes(subject)) {

        setSelectedSubjects(
            selectedSubjects.filter(s => s !== subject)
        );

    } else {

        setSelectedSubjects([
            ...selectedSubjects,
            subject
        ]);

    }

}
    useEffect(() => {

        loadSubjects();

    }, []);

    async function loadSubjects() {

        try {

            const response = await api.get("/subjects");

            setSubjects(response.data);

        } catch (err) {

            console.error(err);

        }

    }

    return (

        <section>

            <h2>Subjects</h2>

            <div className="card">

                {subjects.length === 0 ? (

                    <p>Loading subjects...</p>

                ) : (

                    <div className="subjectsGrid">

    {subjects.map(subject => (

        <div
            key={subject}
            className={`subjectCard ${
                selectedSubjects.includes(subject) ? "selected" : ""
            }`}
            onClick={() => toggleSubject(subject)}
        >

            <input
                type="checkbox"
                checked={selectedSubjects.includes(subject)}
                readOnly
            />

            <span>

    {icons[subject] || "📚"} {subject}

</span>

        </div>

    ))}

</div>
                )}

            </div>

        </section>

    );

}

export default SubjectSelector;