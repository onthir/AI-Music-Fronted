import React from "react";
import {useState, useEffect} from "react";
import './History.css';
import { recommendationshistory } from "../../api";

const History = () => {
    const [history, setHistory] = useState([]); 

    useEffect(() => {
        const fetchRecommendations = async () => {
            try{
                const data = await recommendationshistory();
                setHistory(data);
            }
            catch(err){
                console.error("Failed to fetch recommendations");
            }
        };
        fetchRecommendations();
        console.log(history);
    }, []);
    return(
        <div className="container">
        <h1>History of Recommendations</h1>
         {history.length > 0 && (
             <table className="results-table">
                <thead>
                    <tr>
                        <th>Song Name</th>
                        <th>Artist</th>
                        <th>Album</th>
                        <th>Release Date</th>
                        <th>Themes</th>
                    </tr>
                </thead>

                <tbody>
                    {history.map((song, index) => (
                    <tr key={index}>
                        <td>{song.name}</td>
                        <td>{song.artist}</td>
                        <td>{song.album}</td>
                        <td>{song.release_date}</td>
                        <td>{song.themes.join(", ")}</td>
                    </tr>
                    ))}
                </tbody>
             </table>
    )}
    </div>
    )
}

export default History;