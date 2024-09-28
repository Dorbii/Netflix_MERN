import { fetchFromTMDB } from "../services/tmdb.services.js";
//TODO: condense into single media controller for tv and movie
export async function getTrendingTv(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/tv/day?language=en-US");
        const randomTv = data.results[Math.floor(Math.random() * data.results.length)];
        res.status(200).json({ success: true, content: randomTv });
    } catch {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function getTvTrailerById(req, res) {
    try {
        const { id } = req.params;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ success: false, message: "Invalid tv id - must be valid number" });
        }
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/videos?language=en-US`);
        res.status(200).json({ success: true, content: data.results });
    } catch {
        if (error.message.includes("404")) {
            return res.status(404).json({ success: false, message: "Tv not found" });
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getTvDetailsById(req, res) {
    try {
        const { id } = req.params;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ success: false, message: "Invalid tv id - must be valid number" });
        }
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}?language=en-US`);
        res.status(200).json({ success: true, content: data });
    } catch {
        if (error.message.includes("404")) {
            return res.status(404).json({ success: false, message: "Tv not found" });
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function getSimilarById(req, res) {
    try {
        const { id } = req.params;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ success: false, message: "Invalid tv id - must be valid number" });
        }
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}/similar?language=en-US`);
        res.status(200).json({ success: true, content: data.results });
    } catch {
        if (error.message.includes("404")) {
            return res.status(404).json({ success: false, message: "Tv not found" });
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function getTvByCategory(req, res) {
    try {
        const { category } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${category}?language=en-US`);
        res.status(200).json({ success: true, content: data.results });
    } catch {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}