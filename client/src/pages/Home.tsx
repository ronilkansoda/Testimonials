import Navbar from "../components/Navbar";
import ImageAb from "../assets/abstract2.png";
export default function Home() {
  return (
    <div className="relative w-full  h-screen overflow-hidden">
      <Navbar />
      <div className="absolute inset-0 -z-10 w-full h-full ">
        {/* <Myvideo /> */}
        <img src={ImageAb} alt="abstract" className="w-full h-full object-cover" />
      </div>

      <div className="w-full  h-[50vh] flex justify-center items-center p-4">
        <div className="w-full  lg:w-[600px] min-w-lg p-4 rounded-md">
          <div className="border-8 border-opacity-25 border-gray-700 rounded-md flex drop-shadow-2xl shadow-cyan-500">
            <button
              type="button"
              className="flex items-center justify-center backdrop-blur-2xl bg-opacity-60 bg-gray-800 rounded-l-md px-4 py-2"
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
              className="w-full py-3 focus:outline-none rounded-r-md backdrop-blur-2xl bg-opacity-50 bg-gray-800 text-sm text-white px-3"
              type="text"
              placeholder="https://youtube.com"
            />
          </div>

          <div className="w-full mt-4 rounded-md backdrop-blur-2xl bg-opacity-50 bg-gray-800 text-sm">
            <div className="flex p-3 text-white text-lg space-x-4">
              <p>Mp4</p>
              <p>Mp3</p>
            </div>
            <div className="text-white font-semibold text-lg flex justify-between items-center px-4 py-4">
              <p className="truncate">4K Video</p>
              <button className="px-6 py-3 bg-gray-800 bg-opacity-60 rounded-md">
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
          </div>
        </div>
      </div>
    </div>
  );
}
