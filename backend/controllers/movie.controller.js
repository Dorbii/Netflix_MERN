import { fetchFromTMDB } from "../services/tmdb.services.js";
export async function getTrendingMovie(req, res) {
    try {
        const data = await fetchFromTMDB("https://api.themoviedb.org/3/trending/movie/day?language=en-US");
        const randomMovie = data.results[Math.floor(Math.random() * data.results.length)];
        res.status(200).json({ success: true, content: randomMovie });
    } catch {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function getMovieTrailerById(req, res) {
    try {
        const { id } = req.params;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ success: false, message: "Invalid movie id - must be valid number" });
        }
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`);
        res.status(200).json({ success: true, content: data.results });
    } catch {
        if (error.message.includes("404")) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getMovieDetailsById(req, res) {
    try {
        const { id } = req.params;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ success: false, message: "Invalid movie id - must be valid number" });
        }
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}?language=en-US`);
        res.status(200).json({ success: true, content: data });
    } catch {
        if (error.message.includes("404")) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function getSimilarById(req, res) {
    try {
        const { id } = req.params;
        const parsedId = parseInt(id);
        if (isNaN(parsedId)) {
            return res.status(400).json({ success: false, message: "Invalid movie id - must be valid number" });
        }
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${id}/similar?language=en-US`);
        res.status(200).json({ success: true, content: data.results });
    } catch {
        if (error.message.includes("404")) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function getMovieByCategory(req, res) {
    try {
        const { category } = req.params;
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/movie/${category}?language=en-US`);
        res.status(200).json({ success: true, content: data.results });
    } catch {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}