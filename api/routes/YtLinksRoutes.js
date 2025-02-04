import express from "express";
import { Links } from "../controllers/YtLinksControllers.js";

const router = express.Router();

router.get('/links', Links)

export default router