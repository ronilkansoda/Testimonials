import { ChangeEvent, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import ImageAb from "../assets/abstract2.png";

export default function MyComponent() {
    const [url, setUrl] = useState<any>(null);
    const [inputData, setInputData] = useState({});
    const [loading, setLoading] = useState(false);

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>): void => {
        setInputData({ ...inputData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setLoading(true);
        setUrl(null);

        try {
            const res = await fetch("http://localhost:3000/ytLinks/links", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(inputData),
            });

            const data = await res.json();
            setUrl(data);
        } catch (error) {
            console.error("ERROR: " + error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        console.log(url);
    }, [url]);

    const handleDownload = async (sourceUrl: string, type: "audio" | "video") => {
        if (!sourceUrl) {
            alert("Download URL is missing!");
            return;
        }

        try {
            if (type === "video") {
                // Fetch video file
                const response = await fetch(`http://localhost:3000/ytLinks/download/${type}?source=${encodeURIComponent(sourceUrl)}`); //ensures special characters in the URL (like ? or &) don’t break the request.

                if (!response.ok) {
                    throw new Error("Failed to download file");
                }

                const blob = await response.blob(); // Convert fetched video data to Blob
                const link = document.createElement("a");
                link.href = window.URL.createObjectURL(blob); // Can be converted into URLs 
                console.log(link.href)
                link.download = "download.mp4";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);

                // // Cleanup blob URL
                // window.URL.revokeObjectURL(link.href);
            } else {

                // Directly download the MP3 file if it's a valid URL and below is how it looks like
                // <a href="sourceUrl" download="download.mp3">Download MP3</a>
                const link = document.createElement("a");
                link.href = sourceUrl;
                link.download = "download.mp3";
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        } catch (error) {
            console.error("Download error:", error);
            alert("Failed to download the file. Please try again.");
        }
    };
    return (
        <>
            {/* <Navbar /> */}
            {/* <form onSubmit={handleSubmit}>
                <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
                    
                    <div className="flex space-x-2">
                        <input
                            id="url"
                            type="text"
                            onChange={handleChange}
                            placeholder="Enter YouTube URL"
                            className="mt-4 p-2 w-full max-w-[350px] border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                 
                    <button
                        type="submit"
                        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                        disabled={loading}
                    >
                        {loading ? "Processing..." : "Submit"}
                    </button>

                    {loading && (
                        <div className="mt-4">
                            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
                        </div>
                    )}

                    {url && url.title && (
                        <div className="mt-6 text-center">
                            <img src={url.thumbnailUrl} alt="Video Thumbnail" className="w-64 rounded-lg shadow-lg mx-auto" />

                            <h2 className="text-lg font-semibold mt-2">{url.title}</h2>

                            
                            <div className="mt-4 text-blue-600">
                                {url.downloadUrlAud && (
                                    <p>
                                        <strong>Audio (MP3):</strong>{" "}
                                        <button
                                            // onClick={() => forceDownload(url.downloadUrlAud, "audio.mp3")}
                                            onClick={() => handleDownload(url.downloadUrlAud, "audio")}
                                            className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                        >
                                            Download MP3
                                        </button>
                                    </p>
                                )}

                                {url.downloadUrlVid && (
                                    <p className="mt-2">
                                        <strong>Video (MP4):</strong>{" "}
                                        <button
                                            onClick={() => handleDownload(url.downloadUrlVid, "video")}
                                            className="ml-2 px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
                                        >
                                            Download MP4
                                        </button>
                                    </p>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </form> */}


            <div className="relative w-full  h-screen overflow-hidden">
                <Navbar />
                <div className="absolute inset-0 -z-10 w-full h-full ">
                    {/* <Myvideo /> */}
                    <img
                        src={ImageAb}
                        alt="abstract"
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="w-full  h-[75vh] flex justify-center items-center p-4">
                    <div className="w-full  lg:w-[700px] md:max-w-screen-md min-w-lg p-4 rounded-md">
                        <form onSubmit={handleSubmit}>
                            <div className="border-8 border-gray-700/25  rounded-xl flex drop-shadow-2xl shadow-cyan-500">
                                <button
                                    className="flex items-center justify-center backdrop-blur-2xl bg-opacity-60 bg-gray-800 rounded-l-md px-4 py-2"
                                    type="submit"
                                    disabled={loading}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 192.904 192.904"
                                        width="16px"
                                        className="fill-white"
                                    >
                                        <path d="M190.707 180.101l-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 005.303 2.197 7.498 7.498 0 005.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
                                    </svg>
                                </button>
                                <input
                                    className="w-full py-3 focus:outline-none rounded-r-md backdrop-blur-2xl bg-gray-800/50  text-sm text-white px-3"
                                    type="text"
                                    id="url"
                                    onChange={handleChange}
                                    placeholder="Enter YouTube URL"
                                />
                            </div>
                        </form>

                        <div className="fade-in w-full  mt-4 rounded-md backdrop-blur-2xl bg-gray-800/50  text-sm ">

                            {loading && (
                                <div className="w-full h-40 flex justify-center items-center mt-4 rounded-md bg-gray-800/50 text-sm ">
                                    <div className="animate-spin rounded-full h-12 w-12 border-b-8 border-gray-100"></div>
                                </div>
                            )}

                            {url && url.title && (
                                <>

                                    <div className="inline-block p-3 text-gray-200 text-lg space-x-4 ">
                                        <h1 className="line-clamp px-10 text-2xl   font-normal">
                                            Title : {url.title}
                                        </h1>
                                    </div>

                                    <div className="w-full flex justify-center">
                                        <img
                                            className="object-fit"
                                            width="35%"
                                            height="100vh"
                                            src={url.thumbnailUrl}
                                            alt="thumbnale"
                                        />
                                    </div>

                                    {url.downloadUrlVid && (
                                        <div className="text-white font-semibold text-lg flex justify-between items-center px-10 py-3">
                                            <p className="truncate">MP4</p>
                                            <button className="px-6 py-3 bg-gray-900/60 hover:bg-gray-950/60 transition rounded-md"
                                                onClick={() => handleDownload(url.downloadUrlVid, "video")}
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                    {url.downloadUrlAud && (
                                        <div className="text-white font-semibold text-lg flex justify-between items-center px-10 py-3">
                                            <p className="truncate">MP3</p>
                                            <button className="px-6 py-3 bg-gray-900/60  hover:bg-gray-950/60 transition rounded-md"
                                                onClick={() => handleDownload(url.downloadUrlAud, "audio")}>
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    strokeWidth={1.5}
                                                    stroke="currentColor"
                                                    className="size-6"
                                                >
                                                    <path
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3"
                                                    />
                                                </svg>
                                            </button>
                                        </div>
                                    )}
                                </>
                            )}


                        </div>
                    </div>
                </div>
            </div >
        </>
    );
}
