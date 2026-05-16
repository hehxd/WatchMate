import { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import { authFetch } from '../api/api';

export default function DashboardPage({ setView, setSelectedMovieId, movies = [], currentUser, onLogout }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [watchingList, setWatchingList] = useState([]);
    const [reviewedMovies, setReviewedMovies] = useState([]);
    const fetchedRef = useRef(false);

    useEffect(() => {
        if (movies.length === 0 || !currentUser?.name) return;

        if (fetchedRef.current) return;
        fetchedRef.current = true;

        const fetchReviews = async () => {
            const candidates = movies.slice(0, 50);
            const foundReviews = [];

            for (let i = 0; i < candidates.length; i += 5) {
                const batch = candidates.slice(i, i + 5);
                const results = await Promise.all(
                    batch.map(async (movie) => {
                        try {
                            const res = await authFetch(`/reviews/title/${movie.id}`);
                            if (res.ok) {
                                const reviews = await res.json();
                                if (reviews.length > 0) {
                                    const friendsReviews = reviews.filter(review => review.username !== currentUser.name);
                                    if (friendsReviews.length > 0) {
                                        return { movie, reviews: friendsReviews };
                                    }
                                }
                            }
                        } catch (err) {
                        }
                        return null;
                    })
                );

                foundReviews.push(...results.filter(Boolean));
                if (foundReviews.length >= 4) break;
            }

            setReviewedMovies(foundReviews.slice(0, 4));
        };

        fetchReviews();
    }, [movies, currentUser]);

    useEffect(() => {
        const fetchWatching = async () => {
            try {
                const res = await authFetch('/series-progress');
                if (res.ok) {
                    const data = await res.json();
                    const inProgress = data.filter(item =>
                        item.status === 'WATCHING' || item.status === 'IN_PROGRESS'
                    );
                    setWatchingList(inProgress.slice(0, 10));
                }
            } catch (err) {
            }
        };

        fetchWatching();
    }, []);

    const searchResults = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleMovieClick = (movie) => {
        setSelectedMovieId(movie.id);
        setView('movie_details');
    };

    const getMovieById = (id) => {
        return movies.find(m => m.id === id);
    };

    const getProgress = (item) => {
        const total = item.totalEpisodes ?? item.episodesTotal ?? 0;
        const watched = item.currentEpisode ?? item.watchedEpisodes ?? 0;
        if (!total || total === 0) return 0;
        return Math.round((watched / total) * 100);
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
                                    <span>👥</span> Friends' Reviews
                                </h2>
                                <button onClick={() => setView('friends_reviews')}
                                        className="text-sm text-red-500 hover:text-white font-bold transition-colors">
                                    See all →
                                </button>
                            </div>

                            {reviewedMovies.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {reviewedMovies.map(({ movie, reviews }) => {
                                        const latestReview = reviews[reviews.length - 1];
                                        const reviewerName = latestReview.username || 'Anonymous';
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

                                                    <div className="bg-[#0a0a0a]/60 rounded-xl p-3 border border-white/5 relative mt-auto">
                                                        <div className="absolute -top-2 left-4 w-3 h-3 bg-[#0a0a0a]/60 border-t border-l border-white/5 rotate-45"></div>
                                                        <p className="text-sm text-gray-300 italic line-clamp-2 relative z-10 leading-snug">
                                                            "{reviewText}"
                                                        </p>
                                                        <div className="mt-2 flex items-center gap-1.5">
                                                            <div className="w-5 h-5 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center text-[10px] font-black text-red-400 uppercase flex-shrink-0">
                                                                {reviewerName[0]?.toUpperCase() || '?'}
                                                            </div>
                                                            <span className="text-xs font-bold text-red-400">{reviewerName}</span>
                                                            {reviews.length > 1 && (
                                                                <span className="ml-auto text-[10px] text-gray-600">+{reviews.length - 1} more</span>
                                                            )}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/20">
                                    <p className="text-gray-400 font-bold text-lg mb-1">No friends' reviews yet.</p>
                                    <p className="text-sm text-gray-500">Wait for your friends to review a title!</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-2 mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <span>▶️</span> Currently Watching
                                </h2>
                                <button onClick={() => setView('my_watched')}
                                        className="text-sm text-red-500 hover:text-white font-bold transition-colors">
                                    See all →
                                </button>
                            </div>

                            {watchingList.length > 0 ? (
                                <div className="flex gap-4 overflow-x-auto pb-2 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory">
                                    {watchingList.map(item => {
                                        const titleId = item.titleId ?? item.title?.id;
                                        const movie = getMovieById(titleId);
                                        const progress = getProgress(item);
                                        return (
                                            <div key={item.id}
                                                 onClick={() => movie && handleMovieClick(movie)}
                                                 className="flex-none w-[280px] snap-start p-5 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-red-500/40 cursor-pointer transition-all group flex flex-col gap-4">

                                                <div>
                                                    <h3 className="font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1">
                                                        {movie?.title || item.titleTitle || 'Unknown Series'}
                                                    </h3>
                                                    <span className="text-xs text-gray-500">{movie?.yearText}</span>
                                                </div>

                                                <div className="flex items-center gap-3 text-sm">
                                                    <span className="px-2 py-1 bg-red-500/15 border border-red-500/30 text-red-400 rounded-lg font-bold text-xs">
                                                        S{String(item.currentSeason ?? 1).padStart(2, '0')}
                                                    </span>
                                                    <span className="text-gray-300 font-bold">
                                                        Ep {item.currentEpisode ?? item.watchedEpisodes ?? 0}
                                                        <span className="text-gray-600"> / {item.totalEpisodes ?? '?'}</span>
                                                    </span>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-xs text-gray-500 mb-1">
                                                        <span>Progress</span>
                                                        <span className="text-red-400 font-bold">{progress}%</span>
                                                    </div>
                                                    <div className="w-full h-1.5 bg-white/10 rounded-full overflow-hidden">
                                                        <div
                                                            className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500"
                                                            style={{ width: `${progress}%` }}
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/20">
                                    <p className="text-gray-400 font-bold text-lg mb-1">Nothing in progress.</p>
                                    <p className="text-sm text-gray-500">Start tracking a series to see your progress here!</p>
                                </div>
                            )}
                        </div>

                    </div>
                )}
            </main>
        </div>
    );
}