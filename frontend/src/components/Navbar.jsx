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
        <nav className="w-full bg-[#030303]/70 border-b border-white/[0.05] sticky top-0 z-50 backdrop-blur-md transition-all duration-300">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">

                {/* Logo Section */}
                <div className="flex items-center select-none cursor-pointer group flex-shrink-0" onClick={() => setView('dashboard')}>
                    <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 via-red-500 to-orange-500 flex items-center justify-center shadow-[0_0_20px_rgba(239,68,68,0.2)] group-hover:shadow-[0_0_30px_rgba(239,68,68,0.35)] group-hover:scale-[1.02] transition-all duration-300 mr-2.5">
                        <svg className="w-4.5 h-4.5 text-white transform translate-x-0.5 transition-transform group-hover:scale-110" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M8 5v14l11-7z"/>
                        </svg>
                    </div>
                    <span className="text-lg font-bold tracking-tight text-white uppercase">
                        Watch<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Mate</span>
                    </span>
                </div>

                {/* Desktop Navigation Links */}
                <div className="hidden lg:flex items-center bg-white/[0.01] border border-white/[0.05] rounded-xl p-1 backdrop-blur-lg shadow-sm">
                    <div className="flex items-center space-x-0.5">
                        {navigationItems.map((item) => (
                            <button
                                key={item.id}
                                onClick={() => setView(item.id)}
                                className={`px-4 py-2 rounded-lg text-sm tracking-wide transition-all duration-200 relative ${
                                    activePage === item.id
                                        ? 'text-white font-semibold bg-white/[0.06] border border-white/[0.05] shadow-sm'
                                        : 'text-gray-400 font-medium hover:text-white border border-transparent'
                                }`}
                            >
                                {item.label}
                                {activePage === item.id && (
                                    <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-3 h-[2px] bg-gradient-to-r from-red-500 to-orange-500 rounded-full shadow-[0_0_6px_rgba(239,68,68,0.8)]" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Right Side Options */}
                <div className="flex items-center space-x-2 flex-shrink-0">
                    <div className="relative">
                        <div
                            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            className="flex items-center space-x-2 cursor-pointer group p-1 rounded-xl bg-white/[0.01] hover:bg-white/[0.04] border border-white/[0.02] hover:border-white/[0.06] transition-all duration-200"
                        >
                            <div className="hidden md:block text-right pl-1.5">
                                <div className="text-sm font-medium tracking-wide text-white group-hover:text-red-400 transition-colors">
                                    {displayName}
                                </div>
                            </div>
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-red-600 via-red-500 to-orange-500 flex items-center justify-center text-xs font-semibold text-white shadow-md shadow-red-500/10 uppercase ring-1 ring-white/[0.1] group-hover:ring-red-500/30 transition-all duration-200">
                                {displayInitials?.toUpperCase()}
                            </div>
                            <svg className={`w-3.5 h-3.5 text-gray-500 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180 text-white' : 'group-hover:text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                            </svg>
                        </div>

                        {/* Dropdown Menu */}
                        {isDropdownOpen && (
                            <div className="absolute right-0 mt-2 w-44 bg-[#090909]/95 border border-white/[0.06] rounded-xl shadow-[0_10px_30px_rgba(0,0,0,0.7)] py-1.5 z-50 animate-fade-in backdrop-blur-xl overflow-hidden">
                                <button
                                    onClick={() => { setView('profile'); setIsDropdownOpen(false); }}
                                    className="w-full text-left px-4 py-2 text-sm font-medium text-gray-400 hover:bg-white/[0.04] hover:text-white transition-all duration-200 flex items-center gap-2.5"
                                >
                                    <span className="text-base text-gray-500">👤</span> My Profile
                                </button>

                                <div className="h-px bg-white/[0.05] my-1 mx-3" />

                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left px-4 py-2 text-sm font-medium text-red-400 hover:bg-red-500/[0.06] hover:text-red-300 transition-all duration-200 flex items-center gap-2.5"
                                >
                                    <span className="text-base">👋</span> Secure Logout
                                </button>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        className="lg:hidden p-2 rounded-xl bg-white/[0.02] border border-white/[0.05] text-gray-400 hover:text-white hover:bg-white/[0.04] transition-all duration-200"
                    >
                        <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            {isMobileMenuOpen ? (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l18 12" />
                            ) : (
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            )}
                        </svg>
                    </button>
                </div>

            </div>

            {/* Mobile Sidebar Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden w-full bg-[#030303]/95 border-b border-white/[0.05] backdrop-blur-xl px-4 py-3 space-y-1 animate-fade-in">
                    {navigationItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => { setView(item.id); setIsMobileMenuOpen(false); }}
                            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                                activePage === item.id
                                    ? 'text-white font-semibold bg-white/[0.04] border-l-2 border-red-500 pl-3.5'
                                    : 'text-gray-400 font-medium hover:text-white hover:bg-white/[0.02]'
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