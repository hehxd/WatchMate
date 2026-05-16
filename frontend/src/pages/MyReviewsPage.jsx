import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { authFetch } from '../api/api';

export default function MyReviewsPage({ setView, setSelectedMovieId, movies = [], currentUser, onLogout }) {
    const [filter, setFilter] = useState('ALL');
    const [myReviewedMovies, setMyReviewedMovies] = useState([]);
    const fetchedRef = useRef(false);

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

            setMyReviewedMovies(results.filter(Boolean));
        };

        fetchReviews();
    }, [movies, currentUser]);

    const filteredMyMovies = filter === 'ALL'
        ? myReviewedMovies
        : myReviewedMovies.filter(rm => rm.movie.type === filter);

    const handleMovieClick = (movie) => {
        setSelectedMovieId(movie.id);
        setView('movie_details');
    };

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col animate-fade-in">

            <Navbar setView={setView} activePage="my_reviews" currentUser={currentUser} onLogout={onLogout} />

            <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">
                <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2">My Reviews</h1>
                        <p className="text-gray-400 text-lg">Keep track of everything you have watched and reviewed.</p>
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

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {filteredMyMovies.length > 0 ? (
                        filteredMyMovies.map(({ movie, reviews }) => {
                            const latestReview = reviews[reviews.length - 1];
                            const reviewText = latestReview.commentText || 'No comment provided.';

                            return (
                                <div key={movie.id} onClick={() => handleMovieClick(movie)}
                                     className="bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-red-500/50 cursor-pointer transition-all hover:-translate-y-1 group flex overflow-hidden h-48 shadow-lg">

                                    <div className="w-32 flex-shrink-0 bg-[#0a0a0a] relative">
                                        {movie.posterUrl ? (
                                            <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-white/5 text-3xl border-r border-white/10">🎬</div>
                                        )}
                                        <div className="absolute inset-0 bg-gradient-to-r from-transparent to-[#0a0a0a]/90 md:to-transparent"></div>
                                    </div>

                                    <div className="p-4 flex flex-col justify-between flex-grow min-w-0">
                                        <div>
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="font-bold text-lg text-white group-hover:text-red-400 transition-colors truncate pr-2">
                                                    {movie.title}
                                                </h3>
                                            </div>
                                            <div className="flex items-center gap-2 mb-3">
                                                <span className="text-[10px] px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded uppercase tracking-wider font-bold">
                                                    {movie.type}
                                                </span>
                                                <span className="text-xs text-gray-500">{movie.yearText}</span>
                                            </div>
                                        </div>

                                        <div className="bg-[#0a0a0a]/60 rounded-xl p-3 border border-red-500/20 relative mt-auto">
                                            <div className="absolute -top-2 left-4 w-3 h-3 bg-[#0a0a0a]/60 border-t border-l border-red-500/20 rotate-45"></div>
                                            <p className="text-sm text-gray-300 italic line-clamp-2 relative z-10 leading-snug">
                                                "{reviewText}"
                                            </p>
                                            <div className="mt-2 flex items-center gap-1.5">
                                                <div className="w-5 h-5 rounded-full bg-red-500 text-white flex items-center justify-center text-[10px] font-black uppercase flex-shrink-0">
                                                    {currentUser.name[0]?.toUpperCase() || '?'}
                                                </div>
                                                <span className="text-xs font-bold text-white">{currentUser.name}</span>
                                                <span className="text-[10px] bg-red-500 text-white px-1 py-0.5 rounded uppercase tracking-wider scale-90 origin-left font-bold">You</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <div className="col-span-full text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/20">
                            <p className="text-gray-400 font-bold text-lg mb-1">You haven't written any reviews yet.</p>
                            <p className="text-sm text-gray-500">Go to any title and publish a review to see it listed here!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}