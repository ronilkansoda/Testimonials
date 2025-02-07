import youtubedl from "youtube-dl-exec";
import axios from "axios";
import validator from "validator";
import logger from "../utils/logger.js";

export const Links = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) {
            logger.warn("URL is missing in the request");
            return res.status(400).json({ error: "URL is required" });
        }

        // Validate URL format
        if (!validator.isURL(url, { require_protocol: true })) {
            logger.warn("URL have Invalid format");
            return res.status(400).json({ error: "Invalid URL format" });
        }

        // Allow only YouTube URLs
        const youtubeRegex = /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+$/;
        if (!youtubeRegex.test(url)) {
            logger.warn("No YouTube URL Found");
            return res.status(400).json({ error: "Only YouTube URLs are allowed" });
        }

        logger.info(`Processing video for URL: ${url}`);

        // Fetch video details
        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ["referer:youtube.com", "user-agent:googlebot"],
        });

        if (!output || !output.title) {
            logger.warn(`Failed to fetch details for URL: ${url}`);
            throw new Error("Invalid response from YouTube-DL");
        }

        console.log(`Availability: ${output.availability}`);
        console.log(`License: ${output.license}`);

        const videoTitle = output.title.replace(/[^\w\s]/gi, "");
        let downloadUrlAud = null;
        let downloadUrlVid = null;

        // ✅ Get a direct MP3/MP4 link (Not M3U8)
        // const audioFormat = output.formats.find((f) => f.acodec !== "none" && f.ext === "mp3");
        const audioFormat = output.formats.find(f => f.acodec !== 'none');
        if (audioFormat) downloadUrlAud = audioFormat.url;

        const videoFormat = output.formats.find(
            (f) => f.vcodec !== "none" && f.acodec !== "none" && f.ext === "mp4"
        );
        if (videoFormat) downloadUrlVid = videoFormat.url;

        if (!downloadUrlAud && !downloadUrlVid) {
            logger.warn(`No valid MP3/MP4 links found for URL: ${url}`);
            throw new Error("No direct MP3/MP4 links found, only HLS available.");
        }

        logger.info(`Video processed successfully: ${videoTitle}`);

        res.json({
            title: videoTitle,
            thumbnailUrl: output.thumbnail,
            downloadUrlAud: downloadUrlAud
                ? downloadUrlAud
                : null,
            downloadUrlVid: downloadUrlVid
                ? downloadUrlVid
                : null,
        });
    } catch (error) {
        logger.error(`Error processing video: ${error.message}`);
        console.error("Error:", error);
        res.status(500).json({ error: "Error processing the video." });
    }
};

export const downloadVid = async (req, res) => {
    const { type } = req.params;
    const sourceUrl = req.query.source;
    const filename = req.query.filename;

    if (!sourceUrl) {
        logger.warn("Download attempt without a source URL");
        return res.status(400).json({ error: "Source URL is missing" });
    }
    logger.info(`Download requested: ${filename} [Type: ${type}]`);

    // ❌ Block M3U8 URLs from being processed
    if (sourceUrl.includes("m3u8")) {
        logger.warn(`Blocked M3U8 download attempt: ${sourceUrl}`);
        return res.status(400).json({ error: "HLS streaming files (M3U8) cannot be downloaded directly." });
    }

    try {
        const response = await axios({
            url: sourceUrl,
            method: "GET",
            responseType: "stream",
            headers: {
                "User-Agent": "Mozilla/5.0",
                "Referer": "https://www.youtube.com/",
            },
        });

        // The headers tell the server we are a browser-like client (important for some video sources like YouTube).
        res.setHeader("Content-Disposition", `attachment; filename="${filename}"`); //tells the browser to download the file instead of playing it in the browser.
        res.setHeader("Content-Type", type === "audio" ? "audio/mpeg" : "video/mp4");

        logger.info(`Streaming download started for "${filename}"`);
        response.data.pipe(res);
    } catch (error) {
        logger.error(`Download Error: ${error.message}`);
        console.error("Download Error:", error.message);
        res.status(500).json({ error: "Failed to fetch video/audio." });
    }
};
