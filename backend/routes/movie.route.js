import express from 'express';
import { getTrendingMovie, getMovieTrailerById, getMovieDetailsById, getSimilarById, getMovieByCategory } from '../controllers/movie.controller.js';
const router = express.Router();
router.get("/trending", getTrendingMovie);
router.get("/:id/trailer", getMovieTrailerById);
router.get("/:id/details", getMovieDetailsById);
router.get("/:id/similar", getSimilarById);
router.get("/:category", getMovieByCategory);
export default router;