import { useState, useEffect, useRef } from 'react';
import { authFetch } from '../api/api';

export default function MyReviewsPage({ setView, setSelectedMovieId, movies = [], currentUser }) {
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

    const initials = currentUser?.name ? currentUser.name[0] : 'U';

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col animate-fade-in">
            <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8 border-b border-white/10 pb-6">
                    <div>
                        <h1 className="text-4xl font-black text-white mb-2">My Reviews</h1>
                        <p className="text-gray-400 text-lg">Keep track of everything you have watched and reviewed.</p>
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
                    {filteredMyMovies.length > 0 ? (
                        filteredMyMovies.map(({ movie, reviews }) => {
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
                                                    {initials?.toUpperCase()}
                                                </div>
                                                <span className="text-xs font-bold text-white">{currentUser.name}</span>
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
                            <p className="text-gray-400 font-bold text-lg mb-1">You haven't written any reviews yet.</p>
                            <p className="text-sm text-gray-500">Go to any title and publish a review to see it listed here!</p>
                        </div>
                    )}
                </div>
            </main>
        </div>
    );
}