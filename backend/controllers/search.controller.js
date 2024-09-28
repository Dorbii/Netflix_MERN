import { fetchFromTMDB } from "../services/tmdb.services.js";
import { User } from "../models/user.model.js";

export async function searchPerson(req, res) {
    const { query } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/person?${query}&include_adult=false&language=en-US&page=1`);
        if (data.results.length === 0) {
            return res.status(404).json({ success: false, message: "Person not found" });
        }
        res.status(200).json({ success: true, content: data.results });
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].profile_path,
                    title: data.results[0].name,
                    searchType: "person",
                    createdAt: Date.now()
                }
            }
        });
    } catch {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function searchMovie(req, res) {
    const { query } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/movie?${query}&include_adult=false&language=en-US&page=1`);
        if (data.results.length === 0) {
            return res.status(404).json({ success: false, message: "Movie not found" });
        }
        res.status(200).json({ success: true, content: data.results });
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].title,
                    searchType: "movie",
                    createdAt: Date.now()
                }
            }
        });
    } catch {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
export async function searchTv(req, res) {
    const { query } = req.params;
    try {
        const data = await fetchFromTMDB(`https://api.themoviedb.org/3/search/tv?${query}&include_adult=false&language=en-US&page=1`);
        if (data.results.length === 0) {
            return res.status(404).json({ success: false, message: "Tv Show not found" });
        }
        res.status(200).json({ success: true, content: data.results });
        await User.findByIdAndUpdate(req.user._id, {
            $push: {
                searchHistory: {
                    id: data.results[0].id,
                    image: data.results[0].poster_path,
                    title: data.results[0].name,
                    searchType: "tv",
                    createdAt: Date.now()
                }
            }
        });
    } catch {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function getSearchHistory(req, res) {
    try {
        res.status(200).json({ success: true, content: req.user.searchHistory });
    } catch {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}

export async function deleteItemFromSearchHistory(req, res) {
    const { id } = req.params;
    const parsedId = parseInt(id);
    if (isNaN(parsedId)) {
        return res.status(400).json({ success: false, message: "Invalid movie id - must be valid number" });
    }
    try {
        await User.findByIdAndUpdate(req.user._id, {
            $pull: {
                searchHistory: { id: id }
            },
        });
        res.status(200).json({ success: true, message: "Item deleted from search history" });
    } catch {
        res.status(500).json({ success: false, message: "Internal Server Error" });
    }
}
