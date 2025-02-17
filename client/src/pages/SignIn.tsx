import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function SignIn() {
    const [formData, setFormData] = useState({});
    const [error, setError] = useState<String>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            setLoading(true);
            setError("");
            const res = await fetch(`${API_URL}/user/signIn`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include',
            });

            const data = await res.json();
            console.log(data);
            setLoading(false);

            if (data.error) {
                setError(data.error);
                return;
            }

            navigate('/dashboard');
        } catch (error) {
            setLoading(false);
            setError("Server Error");
            console.log(error);
        }
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#001f3f] to-[#004080] text-white relative overflow-hidden">
            {/* Subtle Animated Background Gradient */}
            <div className="absolute inset-0 bg-gradient-to-br from-[#001f3f] to-[#004080] animate-gradient-x"></div>

            {/* Content */}
            <div className="text-center px-6 relative z-10 w-full max-w-lg">
                <h1 className="text-4xl md:text-6xl font-bold mb-8 animate-fade-in">
                    Sign In
                </h1>
                <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        id="email"
                        className="bg-white/10 p-4 rounded-lg backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0267c1]"
                        onChange={handleChange}
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        id="password"
                        className="bg-white/10 p-4 rounded-lg backdrop-blur-sm text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-[#0267c1]"
                        onChange={handleChange}
                    />
                    <button
                        className="bg-[#0267c1] hover:bg-[#014f91] text-white p-4 rounded-lg uppercase font-semibold transition-all duration-300 transform hover:scale-105 disabled:opacity-70"
                        disabled={loading}
                    >
                        {loading ? 'Loading...' : 'Sign In'}
                    </button>
                </form>
                <div className="flex gap-2 mt-6 justify-center">
                    <p className="text-gray-300">Don't have an account?</p>
                    <Link to="/signUp">
                        <span className="text-[#0267c1] hover:underline">
                            Sign Up
                        </span>
                    </Link>
                </div>
                {error && (
                    <div className="text-red-400 mt-4 animate-fade-in">
                        {error || 'Something went wrong!'}
                    </div>
                )}
            </div>

            {/* Floating Background Elements */}
            <div className="absolute bottom-0 w-full flex justify-center opacity-30 z-0">
                <svg className="w-64 md:w-96 animate-float" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <path fill="#0284c7" d="M40.9,-66.4C53.6,-62,65.8,-53.1,71.5,-40.5C77.1,-28,76.3,-11.9,76,4.7C75.7,21.2,75.8,42.3,67.8,54.5C59.8,66.8,43.6,70.2,29.2,67.9C14.7,65.7,2.1,57.8,-13.2,56.3C-28.4,54.8,-46.4,59.7,-56.4,51.4C-66.5,43,-68.5,21.5,-68.1,1.4C-67.7,-18.7,-64.9,-37.4,-54.2,-45.5C-43.5,-53.6,-24.9,-50.9,-7.5,-58C9.8,-65,19.6,-81,40.9,-66.4Z" transform="translate(100 100)" />
                </svg>
            </div>
            <div className="absolute top-20 left-20 w-16 h-16 bg-[#0284c7] rounded-full opacity-20 animate-float-delay-1"></div>
            <div className="absolute bottom-40 right-20 w-24 h-24 bg-[#0267c1] rounded-full opacity-20 animate-float-delay-2"></div>
        </div>
    );
}














// ----------------------------------------------------------------------------------------------









// import { useState, ChangeEvent, FormEvent } from 'react'
// import { Link, useNavigate } from 'react-router-dom'
// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

// export default function SignIn() {

//     const [formData, setFormData] = useState({})
//     const [error, setError] = useState<String>("");
//     const [loading, setLoading] = useState<boolean>(false);
//     const navigate = useNavigate();

//     // TypeScript knows `e.target` is an <input>.
//     const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
//         setFormData({ ...formData, [e.target.id]: e.target.value });
//     };

//     // TypeScript ensures `e` is always a form event.
//     const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
//         e.preventDefault();
//         // console.log(formData)
//         try {
//             setLoading(true);
//             setError("");
//             const res = await fetch(`${API_URL}/user/signIn`, {
//                 method: 'POST',
//                 // it tell the server that the request body contains JSON data
//                 headers: { 'Content-Type': 'application/json' },
//                 body: JSON.stringify(formData),
//                 credentials: 'include'
//             })

//             const data = await res.json();
//             console.log(data);
//             setLoading(false);

//             if (data.error) {
//                 setError(data.error);
//                 return;
//             }

//             navigate('/');

//         } catch (error) {
//             setLoading(false);
//             setError("Server Error");
//             console.log(error)
//         }
//     }

//     return (
//         <div className='p-4 max-w-lg mx-auto'>
//             <h1 className='text-center font-semibold text-3xl my-7'>Sign In</h1>
//             <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

//                 <input
//                     type="email"
//                     placeholder='Email'
//                     id='email'
//                     className='bg-slate-200 p-3 rounded-lg'
//                     onChange={handleChange} />

//                 <input
//                     type="password"
//                     placeholder='Password'
//                     id='password'
//                     className='bg-slate-200 p-3 rounded-lg'
//                     onChange={handleChange} />

//                 <button
//                     className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
//                     disabled={loading}
//                 >
//                     {loading ? 'Loading...' : 'Sign In'}

//                 </button>
//             </form>
//             <div className="flex gap-2 mt-5">
//                 <p>Dont Have a account?</p>
//                 <Link to={'/signUp'}>
//                     <span className='text-blue-500'>
//                         Sign Up
//                     </span>
//                 </Link>
//             </div>
//             <div className="text-red-700 mt-3">{error ? error || 'Something went wrong!' : ''}</div>
//         </div>
//     )
// }
