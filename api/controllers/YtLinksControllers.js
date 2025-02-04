import youtubedl from 'youtube-dl-exec';

export const Links = async (req, res) => {
    try {
        // const url = "https://www.youtube.com/watch?v=6xKWiCMKKJg";
        const url = "https://youtu.be/hMBKmQEPNzI?si=Fe5wECzBEgRnExHo";
        const format = "mp4";

        if (!url) {
            return res.status(400).send('URL is required');
        }

        const output = await youtubedl(url, {
            dumpSingleJson: true,
            noCheckCertificates: true,
            noWarnings: true,
            preferFreeFormats: true,
            addHeader: ['referer:youtube.com', 'user-agent:googlebot'],
        });
        console.log(output.availability)
        console.log(output.license)
        // if (output.license !== "Creative Commons" || output.availability !== "public") {
        //     return res.status(403).send("This video is copyrighted and cannot be downloaded.");
        // }

        const videoTitle = output.title;
        let downloadUrl = '';

        // Find the appropriate download URL based on the requested format
        if (format === 'mp3') {
            const audioFormat = output.formats.find(f => f.acodec !== 'none' && f.format_note === 'audio only');
            if (audioFormat) {
                downloadUrl = audioFormat.url;
            }
        } else {
            // console.log(output.formats)

            // Finds a format that has both audio and video (vcodec !== 'none' && acodec !== 'none'). Ensures it's not an audio-only format (format_note !== 'audio only').
            const videoFormat = output.formats.find(f => f.vcodec !== 'none' && f.acodec !== 'none' && f.format_note !== 'audio only');
            if (videoFormat) {
                downloadUrl = videoFormat.url;
            }
        }

        if (!downloadUrl) {
            return res.status(404).send('Download link not available for this format.');
        }

        // Send the download URL to the frontend
        res.json({
            title: videoTitle,
            downloadUrl: downloadUrl,
        });

    } catch (error) {
        console.error('Error:', error);
        res.status(500).send('Error processing the video.');
    }
};
