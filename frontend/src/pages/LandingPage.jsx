export default function LandingPage({setView}) {
    return (
        <div className="text-center animate-fade-in">
            <div className="flex items-center justify-center mb-8 select-none group">
                <svg
                    className="w-12 h-12 mr-3 text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.6)] transform transition-transform group-hover:scale-110"
                    fill="currentColor" viewBox="0 0 24 24">
                    <path
                        d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 14.5v-9l6 4.5-6 4.5z"/>
                </svg>
                <span className="text-4xl font-black tracking-tighter text-white md:text-5xl">
          Watch<span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400">Mate</span>
        </span>
            </div>

            <div
                className="inline-flex items-center px-6 py-2.5 mb-8 space-x-2 text-sm font-bold tracking-wide text-red-400 border rounded-full bg-red-500/10 border-red-500/20 shadow-[inset_0_0_12px_rgba(239,68,68,0.1)]">
                <span>🤫</span>
                <span className="uppercase tracking-widest">Invite-only. No strangers.</span>
            </div>

            <h1 className="mb-6 text-5xl font-extrabold tracking-tight md:text-7xl text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-400 leading-[1.1]">
                Forget IMDb. <br/>
                <span
                    className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-orange-400 drop-shadow-lg">What did your friends rate it?</span>
            </h1>

            <p className="mb-12 text-lg md:text-xl font-medium leading-relaxed text-gray-400 max-w-2xl mx-auto">
                The ultimate private platform for your group. Track seasons, create shared lists, and drop honest
                reviews.
            </p>

            <div className="flex flex-col items-center justify-center gap-6 sm:flex-row">
                <button onClick={() => setView('register')}
                        className="relative w-full px-10 py-5 text-lg font-bold text-white transition-all duration-300 bg-red-600 sm:w-auto rounded-2xl hover:bg-red-500 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(229,9,20,0.5)] active:scale-95">
                    Create an Account 🚀
                </button>
                <button onClick={() => setView('login')}
                        className="relative w-full px-10 py-5 text-lg font-bold text-white transition-all duration-300 border-2 sm:w-auto border-white/20 bg-white/5 rounded-2xl hover:bg-white hover:text-[#0a0a0a] hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(255,255,255,0.2)] active:scale-95">
                    Access Platform 👋
                </button>
            </div>
        </div>
    );
}