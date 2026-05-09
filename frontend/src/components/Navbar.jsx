import React, { useState } from 'react';

export default function Navbar({ setView, activePage, currentUser }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const displayName = currentUser?.name || 'Guest User';
    const displayInitials = currentUser?.initials || 'GU';

    const handleLogout = () => {
        console.log("👋 Logging out and clearing session...");

        // Clear all persistent data
        localStorage.removeItem('watchmate_view');
        localStorage.removeItem('watchmate_token');
        localStorage.removeItem('watchmate_user');


        setView('landing');
    };

    return (
        <nav className="w-full bg-[#0a0a0a]/80 backdrop-blur-md border-b border-white/10 sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">

                <div className="flex items-center select-none cursor-pointer" onClick={() => setView('dashboard')}>
                    <svg className="w-8 h-8 mr-3 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                    </svg>
                    <span className="text-2xl font-black tracking-tighter text-white">
                        Watch<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Mate</span>
                    </span>
                </div>

                <div className="hidden lg:flex space-x-6 xl:space-x-8 text-sm font-bold text-gray-400 mt-1">
                    <button onClick={() => setView('dashboard')}
                            className={`pb-1 transition-colors ${activePage === 'dashboard' ? 'text-white border-b-2 border-red-500' : 'hover:text-white'}`}>
                        Dashboard
                    </button>
                    <button onClick={() => setView('friends_reviews')}
                            className={`pb-1 transition-colors ${activePage === 'friends_reviews' ? 'text-white border-b-2 border-red-500' : 'hover:text-white'}`}>
                        Friends' Reviews
                    </button>
                    <button onClick={() => setView('to_watch')}
                            className={`pb-1 transition-colors ${activePage === 'to_watch' ? 'text-white border-b-2 border-red-500' : 'hover:text-white'}`}>
                        To Watch
                    </button>
                    <button onClick={() => setView('my_reviews')}
                            className={`pb-1 transition-colors ${activePage === 'my_reviews' ? 'text-white border-b-2 border-red-500' : 'hover:text-white'}`}>
                        My Reviews
                    </button>
                    <button onClick={() => setView('my_watched')}
                            className={`pb-1 transition-colors ${activePage === 'my_watched' ? 'text-white border-b-2 border-red-500' : 'hover:text-white'}`}>
                        My Watched List
                    </button>
                </div>

                <div className="relative">
                    <div className="flex items-center space-x-3 cursor-pointer group p-2 rounded-xl hover:bg-white/5 transition-colors"
                         onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                        <div className="hidden sm:block text-right">
                            <div className="text-base font-black tracking-wide text-white group-hover:text-red-400 transition-colors">
                                {displayName}
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-full bg-red-900 border-2 border-red-500 flex items-center justify-center font-bold text-white shadow-[0_0_10px_rgba(239,68,68,0.3)] uppercase">
                            {displayInitials}
                        </div>
                        <svg className={`w-4 h-4 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                             fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                    </div>

                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-3 w-56 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl py-2 z-50 animate-fade-in">
                            <button onClick={() => { setView('profile'); setIsDropdownOpen(false); }}
                                    className="w-full text-left px-5 py-3 text-sm text-gray-300 hover:bg-white/5 hover:text-white transition-colors flex items-center gap-3">
                                <span>👤</span> My Profile
                            </button>
                            <div className="h-px bg-white/10 my-2 mx-4"></div>
                            {}
                            <button onClick={handleLogout}
                                    className="w-full text-left px-5 py-3 text-sm text-red-400 hover:bg-red-500/10 hover:text-red-300 transition-colors font-bold flex items-center gap-3">
                                <span>👋</span> Secure Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}