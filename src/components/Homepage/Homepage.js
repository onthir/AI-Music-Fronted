import React from "react";
import {useState, useEffect} from "react";
import './Homepage.css';
import {createRecommendation} from "../../api";

const Homepage = () => {
    const [query, setQuery] = React.useState("");
    const [results, setResults] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);


    // method to handle recommendation
    const handleRecommendatiion = async () => {
        if(!query.trim()){
            setError("Please enter a valid query");
            return;
        }
        setError(null);
        setLoading(true);

        try{
            const data = await createRecommendation(query);
            setResults(data.response);
            console.log(results);
        }
        catch(err){
            setError("Failed to fetch recommendations");
        }
        finally{
            setLoading(false);
        }
    };

    return (
        <div className="homepage-container">
            <div className="input-selection">
                <h1>AI Music Recommender</h1>
                <input
                    type="text"
                    placeholder="What do you want to listen?"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}    
                    className="query-input"
                    />
                    <br></br>                    <button onClick={handleRecommendatiion} className="recommend-button">Recommend</button>
            </div>   

            {loading && <p className="loading-text">Loading recommendations...</p>}
            {error && <p className="error-text">{error}</p>}

             {/*recommendation results  */}
             {results.length > 0 && (
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
                    {results.map((song, index) => (
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

export default Homepage;