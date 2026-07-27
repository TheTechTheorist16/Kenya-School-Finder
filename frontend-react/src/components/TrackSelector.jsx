import { useEffect, useState } from "react";
import api from "../services/api";
import "./TrackSelector.css";

function TrackSelector({ pathway, onSelect }) {

    const [tracks, setTracks] = useState([]);

    useEffect(() => {

        if (!pathway) return;

        async function loadTracks() {

            try {

                const response = await api.get("/tracks", {

                    params: {
                        pathway
                    }

                });

                setTracks(response.data);

            } catch (error) {

                console.error(error);

            }

        }

        loadTracks();

    }, [pathway]);

    if (!pathway) return null;

    return (

        <section className="trackSection">

            <h2>Choose Your Track</h2>

            <div className="trackGrid">

                {tracks.map(track => (

                    <div

                        key={track}

                        className="trackCard"

                        onClick={() => onSelect(track)}

                    >

                        {track}

                    </div>

                ))}

            </div>

        </section>

    );

}

export default TrackSelector;