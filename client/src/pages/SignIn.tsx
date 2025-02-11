import { useState, ChangeEvent, FormEvent } from 'react'
import { Link, useNavigate } from 'react-router-dom'
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export default function SignIn() {

    const [formData, setFormData] = useState({})
    const [error, setError] = useState<String>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // TypeScript knows `e.target` is an <input>.
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // TypeScript ensures `e` is always a form event.
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        // console.log(formData)
        try {
            setLoading(true);
            setError("");
            const res = await fetch(`${API_URL}/user/signIn`, {
                method: 'POST',
                // it tell the server that the request body contains JSON data
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
                credentials: 'include'
            })

            const data = await res.json();
            console.log(data);
            setLoading(false);

            if (data.error) {
                setError(data.error);
                return;
            }

            navigate('/');

        } catch (error) {
            setLoading(false);
            setError("Server Error");
            console.log(error)
        }
    }

    return (
        <div className='p-4 max-w-lg mx-auto'>
            <h1 className='text-center font-semibold text-3xl my-7'>Sign In</h1>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>

                <input
                    type="email"
                    placeholder='Email'
                    id='email'
                    className='bg-slate-200 p-3 rounded-lg'
                    onChange={handleChange} />

                <input
                    type="password"
                    placeholder='Password'
                    id='password'
                    className='bg-slate-200 p-3 rounded-lg'
                    onChange={handleChange} />

                <button
                    className='bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95'
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Sign In'}

                </button>
            </form>
            <div className="flex gap-2 mt-5">
                <p>Dont Have a account?</p>
                <Link to={'/signUp'}>
                    <span className='text-blue-500'>
                        Sign Up
                    </span>
                </Link>
            </div>
            <div className="text-red-700 mt-3">{error ? error || 'Something went wrong!' : ''}</div>
        </div>
    )
}
