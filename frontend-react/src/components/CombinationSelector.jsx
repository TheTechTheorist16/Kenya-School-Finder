import "./CombinationSelector.css";

function CombinationSelector({ combinations, onSelect }) {

    if (!combinations.length) return null;

    return (

        <section className="combinationSection">

            <h2>Choose Subject Combination</h2>

            <div className="combinationGrid">

                {combinations.map((combo, index) => (

                    <div
                        key={`${combo.code}-${index}`}
                        className="combinationCard"
                        onClick={() => onSelect(combo)}
                    >

                        <h3>{combo.code}</h3>

                        <p>{combo.name}</p>

                    </div>

                ))}

            </div>

        </section>

    );
}

export default CombinationSelector;