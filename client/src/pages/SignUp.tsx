import { useState, ChangeEvent, FormEvent } from 'react';
import { Link, useNavigate } from 'react-router-dom';

// interface FormData {
//     username: string;
//     email: string;
//     password: string;
// }

export default function SignUp() {
    // const [formData, setFormData] = useState<FormData>({ username: '', email: '', password: '' });
    const [formData, setFormData] = useState({});
    const [error, setError] = useState<String>("");
    const [loading, setLoading] = useState<boolean>(false);
    const navigate = useNavigate();

    // Handle input change with type safety
    const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };

    // Handle form submission
    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        try {
            setLoading(true);
            const res = await fetch('http://localhost:3000/user/signUp', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await res.json();
            console.log(data);
            setLoading(false);
            console.log(formData)

            if (data.error) {
                setError(data.error);
                return;
            }
            navigate('/')
        } catch (error) {
            setLoading(false);
            setError("Server Error");
        }
    };

    return (
        <div className="p-4 max-w-lg mx-auto">
            <h1 className="text-center font-semibold text-3xl my-7">Sign Up</h1>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Username"
                    id="username"
                    className="bg-slate-200 p-3 rounded-lg"
                    onChange={handleChange}
                />

                <input
                    type="email"
                    placeholder="Email"
                    id="email"
                    className="bg-slate-200 p-3 rounded-lg"
                    onChange={handleChange}
                />

                <input
                    type="password"
                    placeholder="Password"
                    id="password"
                    className="bg-slate-200 p-3 rounded-lg"
                    onChange={handleChange}
                />

                <button
                    className="bg-slate-700 text-white p-3 rounded-lg uppercase hover:opacity-95"
                    disabled={loading}
                >
                    {loading ? 'Loading...' : 'Sign Up'}
                </button>
            </form>

            <div className="flex gap-2 mt-5">
                <p>Have an account?</p>
                <Link to="/signIn">
                    <span className="text-blue-500">Sign In</span>
                </Link>
            </div>

            {/* {error ? <div className="text-red-700 mt-3">Something went wrong!!!</div> :} */}
            <div className="text-red-700 mt-3">{error ? error || 'Something went wrong!' : ''}</div>
        </div>
    );
}
