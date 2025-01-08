


const API_URL = process.env.REACT_APP_API_URL; 

// function to recommend songs
export const createRecommendation = async (query) => {
    try{
        const response = await fetch(`${API_URL}/recommender/`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({query})
        });

        if(!response.ok){
            throw new Error("Failed to fetch recommendations");
        }

        return await response.json();

    }
    catch (error){
        console.error("Error in createRecommendation: ", error);
        throw error;
    }
};

// get the list of recommendations
export const recommendationshistory = async () => {
    try{
        const response = await fetch(`${API_URL}/recommendations/`);

        if(!response.ok){
            throw new Error("Failed to fetch recommendations");
        }

        return await response.json();
    }
    catch (error){
        console.error("Error in recommendationshistory: ", error);
        throw error;
    }
}