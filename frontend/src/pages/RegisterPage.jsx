import { useState } from 'react';

export default function RegisterPage({ setView }) {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Oops! Your passwords do not match.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    username: formData.username,
                    email: formData.email,
                    password: formData.password
                })
            });

            if (response.ok) {
                setSuccess(true);
                setFormData({ username: '', email: '', password: '', confirmPassword: '' });

                setTimeout(() => {
                    setView('login');
                }, 2000);
            } else {
                const errorData = await response.json().catch(() => ({}));
                setError(errorData.message || 'Registration failed. Username or email might be taken.');
            }
        } catch (err) {
            console.error('Registration network error:', err);
            setError('Server is offline or unreachable. Please try again later.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto text-center animate-fade-in">
            <h2 className="text-3xl font-black mb-2 text-white">Create Account</h2>
            <p className="text-gray-400 mb-6">Join your friends and start tracking movies.</p>

            {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/20 rounded-xl animate-fade-in">
                    <p className="text-red-500 text-sm font-bold">{error}</p>
                </div>
            )}

            {success && (
                <div className="mb-4 p-3 bg-green-500/10 border border-green-500/20 rounded-xl animate-fade-in">
                    <p className="text-green-500 text-sm font-bold">
                        Account created successfully! Redirecting to login...
                    </p>
                </div>
            )}

            <form className="space-y-4 text-left" onSubmit={handleRegister}>
                <div>
                    <label className="block text-sm font-bold text-gray-400 mb-1 ml-1">Username</label>
                    <input
                        type="text"
                        value={formData.username}
                        onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                        className="w-full px-6 py-4 bg-[#0a0a0a]/50 border border-white/10 rounded-xl text-white outline-none focus:border-red-500 transition-colors"
                        required
                        placeholder="Choose a username"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-400 mb-1 ml-1">Email</label>
                    <input
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-6 py-4 bg-[#0a0a0a]/50 border border-white/10 rounded-xl text-white outline-none focus:border-red-500 transition-colors"
                        required
                        placeholder="your@email.com"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-400 mb-1 ml-1">Password</label>
                    <input
                        type="password"
                        value={formData.password}
                        onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                        className="w-full px-6 py-4 bg-[#0a0a0a]/50 border border-white/10 rounded-xl text-white outline-none focus:border-red-500 transition-colors"
                        required
                        minLength="6"
                        placeholder="••••••••"
                    />
                </div>

                <div>
                    <label className="block text-sm font-bold text-gray-400 mb-1 ml-1">Confirm Password</label>
                    <input
                        type="password"
                        value={formData.confirmPassword}
                        onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                        className="w-full px-6 py-4 bg-[#0a0a0a]/50 border border-white/10 rounded-xl text-white outline-none focus:border-red-500 transition-colors"
                        required
                        placeholder="••••••••"
                    />
                </div>

                <button
                    type="submit"
                    disabled={success}
                    className="w-full py-4 mt-6 bg-red-600 rounded-xl font-bold hover:bg-red-500 text-white transition-all shadow-[0_0_15px_rgba(229,9,20,0.4)] disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {success ? 'Registered!' : 'Sign Up'}
                </button>
            </form>

            <p className="mt-6 text-sm text-gray-400">
                Already have an account?{' '}
                <button
                    onClick={() => setView('login')}
                    className="text-red-500 hover:text-white font-bold transition-colors"
                >
                    Log in here
                </button>
            </p>
        </div>
    );
}