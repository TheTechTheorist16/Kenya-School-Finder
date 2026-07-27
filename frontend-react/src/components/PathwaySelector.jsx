import "./PathwaySelector.css";

function PathwaySelector({ onSelect }) {

    const pathways = [

        {
            id: "STEM",
            title: "🔬 STEM",
            description:
                "Engineering, Health Sciences, Pure Sciences and Technology"
        },

        {
            id: "SOCIAL SCIENCES",
            title: "🌍 Social Sciences",
            description:
                "Business, Humanities and Languages"
        },

        {
            id: "ARTS & SPORTS SCIENCE",
            title: "🎨 Arts & Sports",
            description:
                "Creative Arts, Performing Arts and Sports Science"
        }

    ];

    return (

        <section className="pathwaySection">

            <h2>Choose Your Pathway</h2>

            <p>
                Select a pathway to view the available tracks and subject combinations.
            </p>

            <div className="pathwayGrid">

                {pathways.map((pathway) => (

                    <div
                        key={pathway.id}
                        className="pathwayCard"
                        onClick={() => onSelect(pathway.id)}
                    >

                        <h3>{pathway.title}</h3>

                        <p>{pathway.description}</p>

                    </div>

                ))}

            </div>

        </section>

    );

}

export default PathwaySelector;