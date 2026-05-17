import { useState } from 'react';

export default function Navbar({ setView, activePage, currentUser }) {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const displayName = currentUser?.name || 'Guest User';
    const displayInitials = currentUser?.name ? currentUser.name[0] : 'GU';

    const handleLogout = () => {
        localStorage.removeItem('watchmate_view');
        localStorage.removeItem('watchmate_token');
        localStorage.removeItem('watchmate_user');
        setView('landing');
    };

    const navigationItems = [
        { id: 'dashboard', label: 'Home' },
        { id: 'friends_reviews', label: "Friends' Reviews" },
        { id: 'my_reviews', label: 'My Reviews' },
        { id: 'watching_currently', label: 'Watching Currently' },
        { id: 'watch_later', label: 'Watch Next' },
        { id: 'my_watched', label: 'Watched' }
    ];

    return (
        <nav className="w-full bg-[#030303]/60 border-b border-white/[0.04] sticky top-0 z-50 backdrop-blur-2xl transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-20 flex items-center justify-between gap-4">

                <div className="flex items-center select-none cursor-pointer group flex-shrink-0" onClick={() => setView('dashboard')}>
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-red-600 via-red-500 to-orange-500 flex items-center justify-center shadow-[0_0_25px_rgba(239,68,68,0.25)] group-hover:shadow-[0_0_35px_rgba(239,68,68,0.4)] group-hover:scale-[1.03] transition-all duration-300 mr-2 sm:mr-3">
                        <svg className="w-5 h-5 text-white transform translate-x-0.5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                    <span className="text-xl font-black tracking-tighter text-white uppercase">
                        Watch<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Mate</span>
                    </span>
                </div>

                <div className="hidden lg:flex items-center bg-white/[0.02] border border-white/[0.06] rounded-2xl p-1 backdrop-blur-xl max-w-full shadow-inner shadow-black/40">
                    <div className="flex items-center space-x-1">
                        {navigationItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id)}
                                className={`px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-300 relative ${
                                    activePage === item.id
                                        ? 'text-white bg-gradient-to-b from-white/[0.08] to-white/[0.02] border border-white/[0.08] shadow-[0_4px_12px_rgba(0,0,0,0.5)]'
                                        : 'text-gray-400 hover:text-white border border-transparent'
                                }`}
                            >
                                {item.label}
                                {activePage === item.id && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-[2px] bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="flex items-center space-x-2 sm:space-x-4 flex-shrink-0">
                    <div className="relative">
                        <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 sm:space-x-3 cursor-pointer group p-1.5 rounded-2xl bg-white/[0.01] hover:bg-white/[0.05] border border-white/[0.02] hover:border-white/[0.08] transition-all duration-300 shadow-sm"
                        >
                            <div className="hidden md:block text-right pl-2">
                                <div className="text-sm font-black tracking-wide text-white group-hover:text-red-400 transition-colors">
                                    {displayName}
                                </div>
                            </div>
                            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-red-600 via-red-500 to-orange-500 flex items-center justify-center text-xs font-black text-white shadow-md shadow-red-500/10 uppercase ring-2 ring-white/[0.08] group-hover:ring-red-500/40 group-hover:scale-[1.02] transition-all duration-300">
                                {displayInitials?.toUpperCase()}
                            </div>
                            <svg className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isDropdownOpen ? 'rotate-180 text-white' : 'group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>

                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-3 w-56 bg-[#090909]/95 border border-white/[0.08] rounded-2xl shadow-[0_15px_50px_rgba(0,0,0,0.8)] py-2 z-50 animate-fade-in backdrop-blur-2xl overflow-hidden">
                                <div className="absolute top-0 right-0 w-32 h-32 bg-red-500/[0.03] blur-2xl rounded-full pointer-events-none" />

                                <button
                                    onClick={() => { setView('profile'); setIsDropdownOpen(false); }}
                                    className="w-full text-left px-5 py-3 text-xs font-black uppercase tracking-wider text-gray-400 hover:bg-white/[0.04] hover:text-white transition-all duration-200 flex items-center gap-3"
                                >
                                    <span className="text-base text-gray-500">👤</span> My Profile
                                </button>

                                <div className="h-px bg-white/[0.06] my-1.5 mx-4" />

                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-5 py-3 text-xs font-black uppercase tracking-wider text-red-400 hover:bg-red-500/[0.08] hover:text-red-300 transition-all duration-200 flex items-center gap-3"
                                >
                                    <span className="text-base">👋</span> Secure Logout
                                </button>
                            </div>
                        )}
                    </div>

                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2.5 rounded-xl bg-white/[0.02] border border-white/[0.06] text-gray-400 hover:text-white hover:bg-white/[0.05] transition-all duration-200"
                    >
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M6 18L18 6M6 6l18 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

            </div>

            {isMobileMenuOpen && (
                <div className="lg:hidden w-full bg-[#030303]/95 border-b border-white/[0.06] backdrop-blur-2xl px-4 py-4 space-y-1.5 animate-fade-in">
                    {navigationItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setView(item.id); setIsMobileMenuOpen(false); }}
                            className={`w-full text-left px-4 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 ${
                                activePage === item.id
                                    ? 'text-white bg-gradient-to-r from-red-600/20 to-transparent border-l-4 border-red-500 pl-3 font-black bg-white/[0.02]'
                                    : 'text-gray-400 hover:text-white hover:bg-white/[0.02]'
                            }`}
                        >
                            {item.label}
                        </button>
                    ))}
                </div>
            )}
        </nav>
    );
}