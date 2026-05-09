import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { authFetch } from '../api/api';

export default function MovieDetailsPage({ setView, movieId, currentUser }) {
    const [title, setTitle] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [ratings, setRatings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!movieId) return;
        fetchTitleData();
    }, [movieId]);

    const fetchTitleData = async () => {
        try {
            setLoading(true);

            const [titleRes, reviewsRes, ratingsRes] = await Promise.all([
                authFetch(`/titles/${movieId}`),
                authFetch(`/reviews/title/${movieId}`),
                authFetch(`/ratings/title/${movieId}`)
            ]);

            const titleData = await titleRes.json();
            const reviewsData = await reviewsRes.json();
            const ratingsData = await ratingsRes.json();

            setTitle(titleData);
            setReviews(reviewsData);
            setRatings(ratingsData);
        } catch (err) {
            setError('Failed to load title data.');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="text-white p-10 flex justify-center items-center h-screen">
            Loading...
        </div>
    );

    if (error || !title) return (
        <div className="text-white p-10 flex justify-center items-center h-screen">
            {error || 'No movie selected.'}
        </div>
    );

    const activeUserName = currentUser?.name || 'Guest User';
    const hasReviewed = reviews.some(r => r.username === activeUserName);

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col animate-fade-in">

            <Navbar setView={setView} activePage="movie_details" currentUser={currentUser} />

            <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">

                <button
                    onClick={() => setView('dashboard')}
                    className="mb-8 flex items-center text-gray-400 hover:text-white font-bold transition-colors w-fit group"
                >
                    <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Dashboard
                </button>

                <div className="flex flex-col md:flex-row gap-8 mb-16">
                    {/* Poster */}
                    <div className="w-full md:w-64 h-96 bg-white/5 border border-white/10 rounded-2xl flex items-center justify-center shadow-2xl flex-shrink-0 overflow-hidden">
                        {title.posterUrl
                            ? <img src={title.posterUrl} alt={title.title} className="w-full h-full object-cover rounded-2xl" />
                            : <span className="text-gray-600 font-bold text-2xl tracking-widest">POSTER</span>
                        }
                    </div>

                    <div className="flex flex-col justify-center">
                        <div className="flex items-center gap-4 mb-2">
                            <span className="px-3 py-1 bg-red-500/20 text-red-400 rounded-lg font-bold text-xs uppercase tracking-wider">
                                {title.type}
                            </span>
                            <span className="text-gray-500 font-bold px-2 py-1 bg-white/5 rounded border border-white/10 text-xs">
                                {title.yearText}
                            </span>
                            {title.imdbRating && (
                                <span className="text-yellow-400 font-bold text-xs px-2 py-1 bg-yellow-400/10 rounded border border-yellow-400/20">
                                    ⭐ {title.imdbRating} IMDb
                                </span>
                            )}
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black text-white mb-4">{title.title}</h1>
                        <p className="text-gray-300 text-lg leading-relaxed max-w-2xl mb-8">{title.plot}</p>

                        <div className="flex flex-wrap gap-6 items-start">
                            <div className="flex flex-col items-center">
                                <button
                                    disabled={true}
                                    className="px-6 py-3 font-bold rounded-xl bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed transition-all flex items-center gap-2"
                                >
                                    <span>📌</span> To Watch Next
                                </button>
                                <span className="text-[10px] font-bold text-red-500/70 uppercase tracking-widest mt-1 flex items-center gap-1">
                                    <span>🚧</span> WIP
                                </span>
                            </div>

                            {!hasReviewed && (
                                <div className="flex flex-col items-center">
                                    <button
                                        disabled={true}
                                        className="px-6 py-3 bg-red-900/40 text-red-200/50 border border-red-900/30 font-bold rounded-xl cursor-not-allowed transition-all flex items-center gap-2"
                                    >
                                        <span>👁️‍🗨️</span> Mark as Watched
                                    </button>
                                    <span className="text-[10px] font-bold text-red-500/70 uppercase tracking-widest mt-1 flex items-center gap-1">
                                        <span>🚧</span> WIP
                                    </span>
                                </div>
                            )}
                        </div>
                    </div>
                </div>

                {/* Reviews */}
                <div className="border-t border-white/10 pt-12">
                    <h2 className="text-3xl font-bold text-white mb-8">Group Reviews</h2>

                    {reviews.length > 0 ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {reviews.map((review) => (
                                <div key={review.id}
                                    className="p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-white/20 transition-colors">
                                    <div className="flex justify-between items-start mb-4">
                                        <span className="font-bold text-lg text-white flex items-center gap-2">
                                            {review.username === activeUserName && (
                                                <span className="text-xs bg-red-500 text-white px-2 py-0.5 rounded uppercase tracking-wider">You</span>
                                            )}
                                            {review.username}
                                        </span>
                                    </div>
                                    <p className="text-gray-300 italic border-l-2 border-red-500 pl-4">"{review.commentText}"</p>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="text-center py-16 bg-gradient-to-b from-white/5 to-transparent border border-white/10 rounded-3xl">
                            <div className="text-6xl mb-4 opacity-50">🎬</div>
                            <h3 className="text-2xl font-bold text-white mb-2 opacity-80">No one has seen this yet!</h3>
                            <p className="text-gray-500 mb-8 max-w-md mx-auto">
                                None of your friends have rated <strong>{title.title}</strong>. Watch it and drop the first review.
                            </p>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}