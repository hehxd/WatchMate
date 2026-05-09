import React, {useState} from 'react';

export default function LoginPage({setView, setCurrentUser}) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('http://localhost:8080/api/auth/login', {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email: email, password: password})
            });

            if (response.ok) {
                const data = await response.json();

                localStorage.setItem('watchmate_token', data.token);

                const activeUsername = data.username || email.split('@')[0];

                const userObj = {
                    name: activeUsername,
                    email: email,
                    initials: activeUsername.substring(0, 2).toUpperCase(),
                    joinDate: 'May 2026'
                };

                localStorage.setItem('watchmate_user', JSON.stringify(userObj));
                setCurrentUser(userObj);

                // Navigate to dashboard
                setView('dashboard');
                localStorage.setItem('watchmate_view', 'dashboard');
            } else {
                setError('Invalid email or password.');
            }
        } catch (err) {
            console.error("Login Error:", err);
            setError('Server is offline. Please try again later.');
        }
    };

    return (
        <div className="w-full max-w-md mx-auto text-center animate-fade-in">
            <h2 className="text-3xl font-black mb-2 text-white">Welcome Back</h2>
            {error && <p className="text-red-500 mb-4 bg-red-500/10 p-2 rounded border border-red-500/20">{error}</p>}
            <form className="space-y-4 text-left" onSubmit={handleLogin}>
                <div>
                    <label className="block text-sm font-bold text-gray-400 mb-1 ml-1">Email</label>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-6 py-4 bg-[#0a0a0a]/50 border border-white/10 rounded-xl text-white outline-none focus:border-red-500 transition-all"
                        required
                    />
                </div>
                <div>
                    <label className="block text-sm font-bold text-gray-400 mb-1 ml-1">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full px-6 py-4 bg-[#0a0a0a]/50 border border-white/10 rounded-xl text-white outline-none focus:border-red-500 transition-all"
                        required
                    />
                </div>
                <button type="submit"
                        className="w-full py-4 mt-4 bg-red-600 rounded-xl font-bold hover:bg-red-500 text-white transition-all shadow-lg">
                    Secure Login
                </button>
            </form>
        </div>
    );
}