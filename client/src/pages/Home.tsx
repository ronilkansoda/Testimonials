import Navbar from "../components/Navbar"

export default function Home() {
    return (
        <>
            <Navbar />

            <div className="flex flex-col items-center p-4 bg-gray-100 min-h-screen">
                <input
                    type="text"
                    placeholder="Enter Something"
                    className="mt-4 p-2 w-full max-w-[400px] border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
            </div>
        </>

    )
}
