import { useState, useEffect, useRef } from 'react';
import { authFetch } from '../api/api';

export default function ProfilePage({ setView, setSelectedMovieId, movies = [], currentUser }) {
    const [myReviews, setMyReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchedRef = useRef(false);

    const name = currentUser?.name || 'Guest User';
    const email = currentUser?.email || 'No email provided';
    const initials = currentUser?.name ? currentUser.name[0] : 'GU';

    useEffect(() => {
        if (movies.length === 0 || !currentUser?.name) return;

        if (fetchedRef.current) return;
        fetchedRef.current = true;

        const fetchReviews = async () => {
            const candidates = movies.slice(0, 50);

            const results = await Promise.all(
                candidates.map(async (movie) => {
                    try {
                        const res = await authFetch(`/reviews/title/${movie.id}`);

                        if (res.ok) {
                            const reviews = await res.json();

                            if (reviews.length > 0) {
                                const myOwnReviews = reviews.filter(review => review.username === currentUser.name);

                                if (myOwnReviews.length > 0) {
                                    return { movie, reviews: myOwnReviews };
                                }
                            }
                        }
                    } catch (err) {
                    }
                    return null;
                })
            );

            setMyReviews(results.filter(Boolean));
            setLoading(false);
        };

        fetchReviews();
    }, [movies, currentUser]);

    const handleMovieClick = (movie) => {
        setSelectedMovieId(movie.id);
        setView('movie_details');
    };

    const recentReviews = myReviews.slice(0, 4);

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col animate-fade-in">
            <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white/5 backdrop-blur-md p-8 rounded-[2.5rem] border border-white/10 mb-12 shadow-xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/5 blur-[80px] rounded-full pointer-events-none"></div>

                    <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
                        <div className="w-28 h-28 rounded-full bg-red-900 border-4 border-red-500 flex items-center justify-center font-black text-4xl text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] uppercase">
                            {initials}
                        </div>
                        <div className="text-center md:text-left mt-4 md:mt-0">
                            <h1 className="text-4xl font-black text-white tracking-tight">{name}</h1>
                            <p className="text-gray-400 mt-1 font-medium">{email}</p>
                            <div className="mt-4 flex gap-3 justify-center md:justify-start">
                                <span className="px-4 py-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl text-xs font-black uppercase tracking-widest shadow-lg shadow-red-500/10">
                                    {myReviews.length} Reviews Total
                                </span>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => setView('edit_profile')}
                            className="mt-8 md:mt-0 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-white transition-all shadow-lg flex items-center gap-2 group relative z-10">
                        <span className="group-hover:rotate-12 transition-transform">⚙️</span> Edit Profile
                    </button>
                </div>

                <div>
                    <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <span>📝</span> My Recent Activity
                        </h2>
                    </div>

                    {loading ? (
                        <div className="text-center py-12">
                            <p className="text-gray-400 font-medium animate-pulse">Loading activity...</p>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {recentReviews.length > 0 ? (
                                recentReviews.map(({ movie, reviews }) => {
                                    const latestReview = reviews[reviews.length - 1];
                                    const reviewText = latestReview.commentText || 'No comment provided.';

                                    return (
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

                                                <div className="bg-[#0a0a0a]/60 backdrop-blur-sm rounded-xl p-3 border border-white/5 relative mt-auto">
                                                    <div className="absolute -top-2 left-4 w-3 h-3 bg-[#0a0a0a]/60 border-t border-l border-white/5 rotate-45"></div>
                                                    <p className="text-sm text-gray-300 italic line-clamp-2 relative z-10 leading-snug">
                                                        "{reviewText}"
                                                    </p>
                                                    <div className="mt-2 flex items-center gap-1.5">
                                                        <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-red-600 to-red-400 flex items-center justify-center text-[10px] font-black text-white uppercase flex-shrink-0">
                                                            {initials}
                                                        </div>
                                                        <span className="text-xs font-bold text-white">{name}</span>
                                                        <span className="text-[10px] bg-red-500 text-white px-1.5 py-0.5 rounded-md uppercase tracking-widest font-bold scale-90 origin-left">You</span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full text-center py-16 bg-gradient-to-b from-white/5 to-transparent border border-dashed border-white/10 rounded-[2.5rem]">
                                    <div className="text-5xl mb-4 opacity-30">🍿</div>
                                    <p className="text-gray-400 font-bold text-lg mb-1">Your slate is clean.</p>
                                    <p className="text-sm text-gray-500">You haven't written any reviews yet.</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}