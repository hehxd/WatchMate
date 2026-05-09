import React, {useState} from 'react';
import Navbar from '../components/Navbar';

export default function EditProfilePage({setView, currentUser, setCurrentUser}) {
    const [formData, setFormData] = useState({...currentUser});

    const [passwords, setPasswords] = useState({
        newPassword: '',
        confirmPassword: ''
    });

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    const handleSave = async (e) => {
        e.preventDefault();
    };

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col animate-fade-in">
            <Navbar setView={setView} activePage="profile" currentUser={currentUser}/>

            <main className="flex-grow max-w-3xl mx-auto w-full px-6 py-12">

                <button
                    onClick={() => setView('profile')}
                    className="mb-8 flex items-center text-gray-400 hover:text-white font-bold transition-colors"
                >
                    <span className="mr-2">←</span> Back to Profile
                </button>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-8 sm:p-12 shadow-2xl">
                    <h1 className="text-3xl font-black text-white mb-2">Edit Profile</h1>
                    <p className="text-gray-400 mb-8">Update your personal information and security settings.</p>

                    {error && (
                        <div
                            className="mb-6 p-4 bg-red-500/10 border border-red-500/50 rounded-xl flex items-center gap-3 animate-fade-in">
                            <span className="text-red-500 text-xl">⚠️</span>
                            <p className="text-red-400 font-bold text-sm">{error}</p>
                        </div>
                    )}

                    {success && (
                        <div
                            className="mb-6 p-4 bg-green-500/10 border border-green-500/50 rounded-xl flex items-center gap-3 animate-fade-in">
                            <span className="text-green-500 text-xl">✅</span>
                            <p className="text-green-400 font-bold text-sm">{success}</p>
                        </div>
                    )}

                    <form onSubmit={handleSave} className="space-y-8">

                        <div className="flex flex-col sm:flex-row items-center gap-6 pb-8 border-b border-white/10">
                            <div
                                className="w-24 h-24 rounded-full bg-red-900 border-2 border-red-500 flex items-center justify-center text-3xl font-black text-white relative group cursor-pointer overflow-hidden opacity-50">
                                {formData.initials}
                                <div
                                    className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                    <span className="text-2xl">📷</span>
                                </div>
                            </div>
                            <div className="text-center sm:text-left">
                                <button type="button" disabled
                                        className="px-4 py-2 bg-white/5 border border-white/10 text-gray-500 text-sm font-bold rounded-lg cursor-not-allowed mb-2">
                                    Upload New Picture
                                </button>
                                <p className="text-xs text-gray-600">Image uploads currently disabled</p>
                            </div>
                        </div>

                        <div className="space-y-5 pb-8 border-b border-white/10 opacity-75">
                            <h2 className="text-xl font-bold text-white mb-4">Personal Details</h2>
                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Username</label>
                                <input
                                    type="text"
                                    value={formData.name}
                                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                                    className="w-full px-5 py-4 bg-[#0a0a0a]/80 border border-white/10 rounded-xl outline-none text-gray-400 cursor-not-allowed"
                                    readOnly
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Email Address</label>
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                                    className="w-full px-5 py-4 bg-[#0a0a0a]/80 border border-white/10 rounded-xl outline-none text-gray-400 cursor-not-allowed"
                                    readOnly
                                />
                            </div>
                        </div>

                        <div className="space-y-5 opacity-75">
                            <div className="mb-4">
                                <h2 className="text-xl font-bold text-white">Security</h2>
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">New Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    disabled
                                    className="w-full px-5 py-4 bg-[#0a0a0a]/80 border border-white/10 rounded-xl outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-bold text-gray-400 mb-2 ml-1">Confirm New
                                    Password</label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    disabled
                                    className="w-full px-5 py-4 bg-[#0a0a0a]/80 border border-white/10 rounded-xl outline-none text-gray-500 cursor-not-allowed"
                                />
                            </div>
                        </div>

                        <div
                            className="pt-6 flex flex-col sm:flex-row gap-4 justify-end items-center border-t border-white/10">
                            <button
                                type="button"
                                onClick={() => setView('profile')}
                                className="w-full sm:w-auto px-8 py-4 bg-transparent hover:bg-white/5 border border-white/20 text-white font-bold rounded-xl transition-all"
                            >
                                Cancel
                            </button>

                            <div className="w-full sm:w-auto flex flex-col items-center">
                                <button
                                    type="submit"
                                    disabled={true}
                                    className="w-full px-8 py-4 bg-red-900/40 text-red-200/50 font-bold rounded-xl border border-red-900/30 cursor-not-allowed transition-all"
                                >
                                    Save Changes
                                </button>
                                <span
                                    className="text-xs font-bold text-red-500/70 uppercase tracking-widest mt-2 flex items-center gap-1">
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