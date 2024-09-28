import { header } from "express-validator";
import { ENV_VARS } from "../config/envVars.js";
import axios from "axios";

export const fetchFromTMDB = async (url) => {
    const options = {
        headers: {
            accept: 'application/json',
            Authorization: `Bearer ${ENV_VARS.TMDB_API_KEY}`
        },
    };
    try {
        const response = await axios.get(url, options);
        if (response.status !== 200) {
            throw new Error(`Failed to fetch data from TMDB${response.statusText}`);
        }
        return response.data;
    } catch (error) {
        return { error: error.response.data };
    }
}