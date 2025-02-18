
export default function Navbar() {
    return (
        // <nav className="bg-gradient-to-br from-gray-900/50 to-gray-300/50">
        <nav className="">
            <div className="max-w-screen-xl flex items-center justify-between mx-auto p-4">
                <a href="/" className="flex items-center space-x-3">
                    <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">Testimonials</span>
                </a>
                <div className="flex items-center space-x-3">
                    <button type="button" className="flex text-sm bg-gray-800 rounded-full ">
                        <img className="w-9 h-9 rounded-full" src="https://as2.ftcdn.net/jpg/02/09/87/47/1000_F_209874776_Wl3PylFXgqcrWC2p4mi2BWmgaa4t1LKO.jpg" alt="User Photo" />
                    </button>
                </div>
            </div>
        </nav>
    );
}
