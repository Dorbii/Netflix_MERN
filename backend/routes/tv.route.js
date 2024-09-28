import express from 'express';
import { getTrendingTv, getTvTrailerById, getTvDetailsById, getSimilarById, getTvByCategory } from '../controllers/tv.controller.js';
const router = express.Router();

router.get("/trending", getTrendingTv);
router.get("/:id/trailer", getTvTrailerById);
router.get("/:id/details", getTvDetailsById);
router.get("/:id/similar", getSimilarById);
router.get("/:category", getTvByCategory);


export default router;