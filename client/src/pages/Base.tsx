import { Link } from "react-router-dom";

export default function Base() {

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#001f3f] to-[#004080] text-white relative overflow-hidden">
            {/* Subtle Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#001f3f] to-[#004080] animate-gradient-x"></div>

            {/* Content */}
            <div className="text-center px-6 relative z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 animate-fade-in">
                    Download YouTube Videos & MP3 Easily
                </h1>
                <p className="text-lg md:text-xl text-gray-300 mb-6 animate-fade-in animate-delay-200">
                    Convert and download YouTube videos in high quality MP4 & MP3 formats instantly.
                </p>
                <Link to="/signin">
                    <button className="px-6 py-3 text-lg bg-[#0267c1] hover:bg-[#014f91] rounded-lg shadow-lg transition-transform transform hover:scale-105 animate-fade-in animate-delay-400">
                        Login to Access
                    </button>
                </Link>
            </div>

            {/* Floating and Path-Changing SVG */}
            <div className="absolute bottom-0 w-full flex justify-center opacity-30 z-0">
                <svg className="w-64 md:w-96 animate-float-path" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#0284c7" d="M40.9,-66.4C53.6,-62,65.8,-53.1,71.5,-40.5C77.1,-28,76.3,-11.9,76,4.7C75.7,21.2,75.8,42.3,67.8,54.5C59.8,66.8,43.6,70.2,29.2,67.9C14.7,65.7,2.1,57.8,-13.2,56.3C-28.4,54.8,-46.4,59.7,-56.4,51.4C-66.5,43,-68.5,21.5,-68.1,1.4C-67.7,-18.7,-64.9,-37.4,-54.2,-45.5C-43.5,-53.6,-24.9,-50.9,-7.5,-58C9.8,-65,19.6,-81,40.9,-66.4Z" transform="translate(100 100)" />
                </svg>
            </div>

            {/* Additional Floating Shapes with Path Changes */}
            <div className="absolute top-20 left-20 w-16 h-16 bg-[#0284c7] rounded-full opacity-20 animate-float-path-delay-1"></div>
            <div className="absolute bottom-40 right-20 w-24 h-24 bg-[#0267c1] rounded-full opacity-20 animate-float-path-delay-2"></div>
        </div>
    );
}