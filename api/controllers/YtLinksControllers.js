import youtubedl from "youtube-dl-exec";
import axios from "axios";

export const Links = async (req, res) => {
    try {
        const { url } = req.body;
        if (!url) return res.status(400).json({ error: "URL is required" });

        // Fetch video details
        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ["referer:youtube.com", "user-agent:googlebot"],
        });

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
            throw new Error("No direct MP3/MP4 links found, only HLS available.");
        }

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
        console.error("Error:", error);
        res.status(500).json({ error: "Error processing the video." });
    }
};

export const downloadVid = async (req, res) => {
    const { type, filename } = req.params;
    const sourceUrl = req.query.source;

    if (!sourceUrl) {
        return res.status(400).json({ error: "Source URL is missing" });
    }

    // ❌ Block M3U8 URLs from being processed
    if (sourceUrl.includes("m3u8")) {
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

        response.data.pipe(res);
    } catch (error) {
        console.error("Download Error:", error.message);
        res.status(500).json({ error: "Failed to fetch video/audio." });
    }
};
