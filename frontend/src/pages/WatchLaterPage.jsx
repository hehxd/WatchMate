import { useState, useEffect } from 'react';

export default function WatchLaterPage({ setView, setSelectedMovieId, movies = [] }) {
    const [filter, setFilter] = useState('ALL');
    const [toWatchList, setToWatchList] = useState([]);

    useEffect(() => {
        if (movies.length === 0) return;

        // Grab our simple list of IDs from local storage
        const savedWatchList = JSON.parse(localStorage.getItem('watchmate_watch_later') || '[]');

        // Find the full movie objects that match those IDs
        const matchedItems = movies.filter(movie => savedWatchList.includes(String(movie.id)));

        setToWatchList(matchedItems);
    }, [movies]);

    const filteredToWatch = filter === 'ALL'
        ? toWatchList
        : toWatchList.filter(movie => movie.type === filter);

    const handleMovieClick = (movie) => {
        setSelectedMovieId(movie.id);
        setView('movie_details');
    };

    const handleRemoveFromWatchlist = (e, movieId) => {
        e.stopPropagation(); // Prevents the card click from triggering when you click remove

        // Remove from local storage
        const savedWatchList = JSON.parse(localStorage.getItem('watchmate_watch_later') || '[]');
        const newList = savedWatchList.filter(id => id !== String(movieId));
        localStorage.setItem('watchmate_watch_later', JSON.stringify(newList));

        // Remove from current UI state
        setToWatchList(prevList => prevList.filter(movie => String(movie.id) !== String(movieId)));
    };

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col animate-fade-in">
            <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2">Watch Next</h1>
                        <p className="text-gray-400 text-lg">Titles you are planning to watch in the future.</p>
                    </div>
                    <div className="flex bg-[#0a0a0a]/60 border border-white/5 rounded-xl p-1 backdrop-blur-md">
                        {['ALL', 'MOVIE', 'SERIES'].map(type => (
                            <button key={type} onClick={() => setFilter(type)}
                                    className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all
                                    ${filter === type
                                        ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/20'
                                        : 'text-gray-400 hover:text-white'}`}>
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {filteredToWatch.length > 0 ? (
                        filteredToWatch.map(movie => (
                            <div key={movie.id} onClick={() => handleMovieClick(movie)}
                                 className="bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 hover:border-red-500/30 cursor-pointer transition-all duration-300 hover:-translate-y-1 group flex overflow-hidden h-48 shadow-xl">

                                <div className="w-32 flex-shrink-0 bg-[#0a0a0a] relative overflow-hidden rounded-l-[2rem]">
                                    {movie.posterUrl ? (
                                        <img src={movie.posterUrl} alt={movie.title}
                                             className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-white/5 text-3xl border-r border-white/10">🎬</div>
                                    )}
                                    <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/90 z-10"></div>
                                </div>

                                <div className="p-5 flex flex-col justify-between flex-grow min-w-0 relative z-10">
                                    <div>
                                        <div className="flex justify-between items-start mb-1">
                                            <h3 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors truncate pr-2">
                                                {movie.title}
                                            </h3>
                                        </div>
                                        <div className="flex items-center gap-2 mb-3">
                                            <span className="text-[10px] px-2 py-0.5 bg-red-500/20 text-red-400 rounded-md uppercase tracking-wider font-black">
                                                {movie.type}
                                            </span>
                                            <span className="text-xs text-gray-500 font-medium">{movie.yearText}</span>
                                        </div>
                                    </div>

                                    {/* Cleaned up Remove button area */}
                                    <div className="mt-auto w-full pt-2">
                                        <button
                                            onClick={(e) => handleRemoveFromWatchlist(e, movie.id)}
                                            className="w-full text-xs font-bold text-red-400 bg-red-500/10 hover:bg-red-500/20 px-3 py-2 rounded-lg transition-colors flex items-center justify-center gap-1.5 group/btn"
                                        >
                                            <span className="group-hover/btn:scale-110 transition-transform">❌</span>
                                            <span className="uppercase tracking-wider">Remove</span>
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-16 bg-gradient-to-b from-white/5 to-transparent border border-dashed border-white/10 rounded-[2.5rem]">
                            <div className="text-5xl mb-4 opacity-30">📌</div>
                            <p className="text-gray-400 font-bold text-lg mb-1">Your watchlist is empty.</p>
                            <p className="text-sm text-gray-500">Find a movie you want to see and pin it here!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}