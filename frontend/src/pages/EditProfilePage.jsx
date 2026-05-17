import { useState } from 'react';

export default function EditProfilePage({ setView, currentUser, setCurrentUser }) {
    const [formData, setFormData] = useState({ ...currentUser });

    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const displayInitials = currentUser?.name ? currentUser.name[0] : 'GU';

    const handleTriggerSave = (e) => {
        e.preventDefault();
    };

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col animate-fade-in">
            <main className="flex-grow max-w-3xl mx-auto w-full px-6 py-12">

                <button
                    onClick={() => setView('profile')}
                    className="mb-8 flex items-center text-gray-400 hover:text-white font-bold transition-colors w-fit group px-4 py-2 bg-white/5 rounded-xl border border-white/10"
                >
                    <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Profile
                </button>

                <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 sm:p-12 shadow-2xl relative overflow-hidden backdrop-blur-md">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/5 blur-[100px] rounded-full pointer-events-none"></div>

                    <h1 className="text-3xl font-black text-white mb-2">Edit Profile</h1>
                    <p className="text-gray-400 mb-8">Update your personal details, avatar image, and security settings.</p>

                    {error && (
                        <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-3 animate-fade-in">
                            <span className="text-red-500 text-xl">⚠️</span>
                            <p className="text-red-400 font-bold text-sm">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div className="mb-6 p-4 bg-green-500/10 border border-green-500/30 rounded-xl flex items-center gap-3 animate-fade-in">
                            <span className="text-green-500 text-xl">✅</span>
                            <p className="text-green-400 font-bold text-sm">{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleTriggerSave} className="space-y-8">
                        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-white/10 opacity-50">
                            <div className="w-24 h-24 rounded-full bg-red-900 border-4 border-red-500 flex items-center justify-center text-3xl font-black text-white relative group overflow-hidden shadow-lg shadow-red-500/10 select-none cursor-not-allowed">
                                {displayInitials?.toUpperCase()}
                            </div>
                            <div className="text-center sm:text-left">
                                <button
                                    type="button"
                                    disabled
                                    className="px-4 py-2 bg-white/5 border border-white/10 text-gray-500 text-xs font-bold uppercase tracking-wider rounded-xl cursor-not-allowed mb-2"
                                >
                                    Choose File
                                </button>
                                <p className="text-[11px] font-medium text-gray-600 uppercase tracking-wider">Avatar uploads currently disabled</p>
                            </div>
                        </div>

                        <div className="space-y-5 pb-8 border-b border-white/10 opacity-50">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span>👤</span> Personal Details
                            </h2>
                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-2 ml-1">New Username</label>
                                <input
                                    type="text"
                                    disabled
                                    placeholder={currentUser?.name || "Enter replacement username"}
                                    className="w-full px-5 py-4 bg-[#0a0a0a]/50 border border-white/5 rounded-xl outline-none text-gray-500 cursor-not-allowed text-base font-medium placeholder:text-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">New Email Address</label>
                                <input
                                    type="email"
                                    disabled
                                    placeholder={currentUser?.email || "newemail@example.com"}
                                    className="w-full px-5 py-4 bg-[#0a0a0a]/50 border border-white/5 rounded-xl outline-none text-gray-500 cursor-not-allowed text-base font-medium placeholder:text-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Confirm New Email Address</label>
                                <input
                                    type="email"
                                    disabled
                                    placeholder="Repeat new email address"
                                    className="w-full px-5 py-4 bg-[#0a0a0a]/50 border border-white/5 rounded-xl outline-none text-gray-500 cursor-not-allowed text-base placeholder:text-gray-600"
                                />
                            </div>
                        </div>

                        <div className="space-y-5 opacity-50">
                            <h2 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
                                <span>🔒</span> Security
                            </h2>

                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-2 ml-1">New Password</label>
                                <input
                                    type="password"
                                    disabled
                                    placeholder="••••••••"
                                    className="w-full px-5 py-4 bg-[#0a0a0a]/50 border border-white/5 rounded-xl outline-none text-gray-500 cursor-not-allowed text-base placeholder:text-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-500 mb-2 ml-1">Confirm New Password</label>
                                <input
                                    type="password"
                                    disabled
                                    placeholder="••••••••"
                                    className="w-full px-5 py-4 bg-[#0a0a0a]/50 border border-white/5 rounded-xl outline-none text-gray-500 cursor-not-allowed text-base placeholder:text-gray-600"
                                />
                            </div>
                        </div>

                        <div className="pt-6 flex flex-col sm:flex-row gap-4 justify-end items-center border-t border-white/10">
                            <button
                                type="button"
                                onClick={() => setView('profile')}
                                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 border border-white/25 text-white font-bold rounded-xl transition-all"
                            >
                                Cancel
                            </button>

                            <div className="w-full sm:w-auto flex flex-col items-center">
                                <button
                                    type="submit"
                                    disabled
                                    className="w-full px-8 py-4 bg-red-900/20 text-red-400/40 font-black rounded-xl border border-red-900/20 cursor-not-allowed transition-all"
                                >
                                    Save Changes
                                </button>
                                <span className="text-xs font-bold text-red-500/70 uppercase tracking-widest mt-2 flex items-center gap-1 animate-pulse">
                                    <span>🚧</span> Work in progress
                                </span>
                            </div>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
}