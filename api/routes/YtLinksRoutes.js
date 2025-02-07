import express from "express";
import { Links, downloadVid } from "../controllers/YtLinksControllers.js";

const router = express.Router();

router.post("/links", Links);
router.get("/download/:type", downloadVid);

export default router;
