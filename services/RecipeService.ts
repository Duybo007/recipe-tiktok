import axios from "axios";

const baseUrl = "https://api.spoonacular.com/recipes"

export const getSearchRecipes = async(searchTerm) => {
    try {
        const recipes = await axios.get(`${baseUrl}/complexSearch?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey1}&number=8&query=${searchTerm}`)

        return recipes.data.results
    } catch (error) {
        try {
            const recipes = await axios.get(`${baseUrl}/complexSearch?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey2}&number=8&query=${searchTerm}`)
    
            return recipes.data.results
        } catch (error) {
            try {
                const recipes = await axios.get(`${baseUrl}/complexSearch?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey3}&number=8&query=${searchTerm}`)
        
                return recipes.data.results
            } catch (error) {
                try {
                    const recipes = await axios.get(`${baseUrl}/complexSearch?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey4}&number=8&query=${searchTerm}`)
            
                    return recipes.data.results
                } catch (error) {
                    try {
                        const recipes = await axios.get(`${baseUrl}/complexSearch?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey5}&number=8&query=${searchTerm}`)
                
                        return recipes.data.results
                    } catch (error) {
                        
                    }   
                }   
            }   
        }
    }
}

export const getRecipesByCuisine = async (cuisine: string, offset) => {
    try {
        const data = await axios.get(
            `${baseUrl}/complexSearch?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey1}&number=5&cuisine=${cuisine}&offset=${offset}`
        )
              
        return data.data.results
    } catch (error) {
        try {
            // Retry with the alternate API key
            const data = await axios.get(
                `${baseUrl}/complexSearch?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey2}&number=5&cuisine=${cuisine}&offset=${offset}`
            );
            
            return data.data.results;
        } catch (retryError) {
            try {
                // Retry with the alternate API key
                const data = await axios.get(
                    `${baseUrl}/complexSearch?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey3}&number=5&cuisine=${cuisine}&offset=${offset}`
                );
                
                return data.data.results;
            } catch (retryError) {
                // console.log("Error with the alternate API key:", retryError);
                try {
                    // Retry with the alternate API key
                    const data = await axios.get(
                        `${baseUrl}/complexSearch?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey4}&number=5&cuisine=${cuisine}&offset=${offset}`
                    );
                    
                    return data.data.results;
                } catch (retryError) {
                    // console.log("Error with the alternate API key:", retryError);
                    try {
                        // Retry with the alternate API key
                        const data = await axios.get(
                            `${baseUrl}/complexSearch?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey5}&number=5&cuisine=${cuisine}&offset=${offset}`
                        );
                        
                        return data.data.results;
                    } catch (retryError) {
                        console.log("Out of points")
                    }
                }
            }
        }
    }
}

export const getRecipeDetail = async(id: string | string[]) => {
    try {
        const recipe = await axios.get(`${baseUrl}/${id}/information?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey1}&includeNutrition=true`)
        return recipe.data
    } catch (error) {
        try {
            const recipe = await axios.get(`${baseUrl}/${id}/information?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey2}&includeNutrition=true`)
            return recipe.data
        } catch (error) {
            try {
                const recipe = await axios.get(`${baseUrl}/${id}/information?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey3}&includeNutrition=true`)
                return recipe.data
            } catch (error) {
                try {
                    const recipe = await axios.get(`${baseUrl}/${id}/information?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey4}&includeNutrition=true`)
                    return recipe.data
                } catch (error) {   
                    try {
                        const recipe = await axios.get(`${baseUrl}/${id}/information?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey5}&includeNutrition=true`)
                        return recipe.data
                    } catch (error) {
                        console.log("Out of points")   
                    }
                }
            }
        }
    }
}

export const searchIngredients = async(ingredient: string) => {
    try {
        const ingredients = await axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey1}&query=${ingredient}&number=30&sortDirection=asc`)
        return ingredients.data
    } catch (error) {
        try {
            const ingredients = await axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey2}&query=${ingredient}&number=30&sortDirection=asc`)
            return ingredients.data
        } catch (error) {
            try {
                const ingredients = await axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey3}&query=${ingredient}&number=30&sortDirection=asc`)
                return ingredients.data
            } catch (error) {
                try {
                    const ingredients = await axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey4}&query=${ingredient}&number=30&sortDirection=asc`)
                    return ingredients.data
                } catch (error) {
                    try {
                        const ingredients = await axios.get(`https://api.spoonacular.com/food/ingredients/search?apiKey=${process.env.NEXT_PUBLIC_spoonacularApiKey5}&query=${ingredient}&number=30&sortDirection=asc`)
                        return ingredients.data
                    } catch (error) {
                        console.log("Out of points")
                    }
                }
            }
        }
    }
}