import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { authFetch } from '../api/api';

export default function DashboardPage({ setView, setSelectedMovieId, movies, currentUser, onLogout }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [myRecentReviews, setMyRecentReviews] = useState([]);

    useEffect(() => {
        const fetchMyReviews = async () => {
            try {
                const res = await authFetch('/reviews/me');
                if (res.ok) {
                    const data = await res.json();
                    setMyRecentReviews(data.slice(0, 2));
                }
            } catch (err) {
                console.error('Failed to fetch reviews', err);
            }
        };
        fetchMyReviews();
    }, []);

    const searchResults = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMovieClick = (movie) => {
        setSelectedMovieId(movie.id);
        setView('movie_details');
    };

    const getMovieForReview = (review) => {
        return movies.find(m => m.id === review.titleId);
    };

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col animate-fade-in">

            <Navbar setView={setView} activePage="dashboard" currentUser={currentUser} onLogout={onLogout} />

            <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">

                <div className="mb-12">
                    <h1 className="text-4xl font-black text-white mb-6">Welcome Back!</h1>
                    <div className="relative w-full shadow-2xl">
                        <input
                            type="text"
                            placeholder="Search the database for a movie..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full px-6 py-5 pl-14 bg-white/5 backdrop-blur-md border border-white/20 rounded-2xl focus:border-red-500 focus:ring-1 focus:ring-red-500 outline-none transition-all text-white text-lg"
                        />
                        <svg className="w-6 h-6 absolute left-5 top-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                        </svg>
                    </div>
                </div>

                {searchQuery !== '' ? (
                    <div className="animate-fade-in">
                        <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2">Search Results</h2>
                        {searchResults.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {searchResults.map(movie => (
                                    <div key={movie.id} onClick={() => handleMovieClick(movie)}
                                        className="p-6 bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl border border-white/10 hover:border-red-500/50 hover:-translate-y-1 cursor-pointer transition-all">
                                        <div className="flex justify-between items-start mb-2">
                                            <h3 className="font-bold text-xl text-white">{movie.title}</h3>
                                            <span className="text-gray-500 font-bold">{movie.yearText}</span>
                                        </div>
                                        <span className="text-xs px-2 py-1 bg-red-500/20 text-red-400 rounded font-bold uppercase tracking-wider">
                                            {movie.type}
                                        </span>
                                        <p className="text-sm text-gray-400 mt-2 line-clamp-2">{movie.plot}</p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-gray-400">No movies found.</p>
                        )}
                    </div>
                ) : (
                    <div className="animate-fade-in space-y-12">
                        <div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <span>⭐</span> My Recent Reviews
                                </h2>
                                <button onClick={() => setView('my_reviews')}
                                    className="text-sm text-red-500 hover:text-white font-bold transition-colors">
                                    See all →
                                </button>
                            </div>

                            {myRecentReviews.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {myRecentReviews.map(review => {
                                        const movie = getMovieForReview(review);
                                        return (
                                            <div key={review.id}
                                                onClick={() => movie && handleMovieClick(movie)}
                                                className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-white/30 cursor-pointer transition-all flex flex-col justify-between group">
                                                <div>
                                                    <div className="flex justify-between items-start mb-2">
                                                        <h3 className="font-bold text-xl text-white group-hover:text-red-400 transition-colors">
                                                            {movie?.title || 'Unknown Title'}
                                                        </h3>
                                                        <span className="text-xs font-bold px-2 py-1 bg-white/5 border border-white/10 text-gray-300 rounded uppercase tracking-wider">
                                                            {movie?.yearText}
                                                        </span>
                                                    </div>
                                                    <div className="mt-2 border-l-2 border-red-500 pl-3">
                                                        <p className="text-sm text-gray-300 italic line-clamp-2">"{review.commentText}"</p>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/20">
                                    <p className="text-gray-400 font-bold text-lg mb-1">No reviews yet.</p>
                                    <p className="text-sm text-gray-500">Search for a movie and be the first to drop a review!</p>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </main>
        </div>
    );
}