import { useEffect, useState } from "react";
import api from "../services/api";

function Statistics() {
    const [stats, setStats] = useState(null);

    useEffect(() => {
        async function loadStats() {
            try {
                const response = await api.get("/statistics");
                setStats(response.data);
            } catch (error) {
                console.error(error);
            }
        }

        loadStats();
    }, []);

    if (!stats) {
        return <p>Loading...</p>;
    }

    return (
        <section>
            <h2>{stats.schools}</h2>
            <p>Schools</p>
        </section>
    );
}

export default Statistics;