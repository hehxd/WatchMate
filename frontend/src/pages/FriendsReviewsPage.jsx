import React, { useState } from 'react';
import Navbar from '../components/Navbar';

export default function FriendsReviewsPage({ setView, setSelectedMovieId, movies, currentUser, onLogout }) {
    const [filter, setFilter] = useState('ALL');

    const filteredMovies = filter === 'ALL'
        ? movies
        : movies.filter(m => m.type === filter);

    const handleMovieClick = (movie) => {
        setSelectedMovieId(movie.id);
        setView('movie_details');
    };

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col animate-fade-in">

            <Navbar setView={setView} activePage="friends_reviews" currentUser={currentUser} onLogout={onLogout} />

            <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2">Browse Titles</h1>
                        <p className="text-gray-400 text-lg">Click any title to see the group's reviews.</p>
                    </div>
                    <div className="flex gap-2">
                        {['ALL', 'MOVIE', 'SERIES'].map(type => (
                            <button key={type} onClick={() => setFilter(type)}
                                className={`px-4 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all
                                    ${filter === type
                                        ? 'bg-red-600 text-white'
                                        : 'bg-white/5 text-gray-400 hover:text-white border border-white/10'}`}>
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredMovies.length > 0 ? (
                        filteredMovies.map((movie) => (
                            <div key={movie.id} onClick={() => handleMovieClick(movie)}
                                className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-red-500/50 hover:bg-white/10 cursor-pointer transition-all hover:-translate-y-1 group flex flex-col justify-between">
                                <div>
                                    <div className="flex justify-between items-start mb-2">
                                        <h3 className="font-bold text-xl text-white group-hover:text-red-400 transition-colors">
                                            {movie.title}
                                        </h3>
                                        <span className="text-xs font-bold px-2 py-1 bg-white/5 border border-white/10 text-gray-300 rounded uppercase tracking-wider">
                                            {movie.yearText}
                                        </span>
                                    </div>
                                    <span className="inline-block px-3 py-1 mb-4 bg-red-500/20 text-red-400 rounded-lg font-bold text-xs uppercase tracking-wider">
                                        {movie.type}
                                    </span>
                                    {movie.imdbRating && (
                                        <p className="text-xs text-yellow-400 font-bold">⭐ {movie.imdbRating} IMDb</p>
                                    )}
                                    <p className="text-sm text-gray-400 mt-2 line-clamp-2">{movie.plot}</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        <div className="col-span-full text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/20">
                            <p className="text-gray-400 font-bold text-lg mb-1">No titles in the database yet.</p>
                            <p className="text-sm text-gray-500">Add some titles to get started!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}