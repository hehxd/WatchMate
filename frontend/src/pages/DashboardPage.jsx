import { useState, useEffect, useRef } from 'react';
import { authFetch } from '../api/api';

export default function DashboardPage({ setView, setSelectedMovieId, movies = [], currentUser }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [searchType, setSearchType] = useState('ALL');
    const [watchingList, setWatchingList] = useState([]);
    const [reviewedMovies, setReviewedMovies] = useState([]);
    const [searchReviews, setSearchReviews] = useState({});
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

    const searchResults = movies.filter(movie => {
        const matchesTitle = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesType = searchType === 'ALL' || movie.type === searchType;
        return matchesTitle && matchesType;
    });

    useEffect(() => {
        if (searchQuery === '') return;

        const fetchSearchResultsReviews = async () => {
            const visibleResults = searchResults.slice(0, 10);
            const newSearchReviews = { ...searchReviews };

            await Promise.all(
                visibleResults.map(async (movie) => {
                    if (newSearchReviews[movie.id] !== undefined) return;
                    try {
                        const res = await authFetch(`/reviews/title/${movie.id}`);
                        if (res.ok) {
                            const reviews = await res.json();
                            newSearchReviews[movie.id] = reviews.length > 0 ? reviews : [];
                        } else {
                            newSearchReviews[movie.id] = [];
                        }
                    } catch (err) {
                        newSearchReviews[movie.id] = [];
                    }
                })
            );

            setSearchReviews(newSearchReviews);
        };

        const delayDebounce = setTimeout(() => {
            fetchSearchResultsReviews();
        }, 300);

        return () => clearTimeout(delayDebounce);
    }, [searchQuery, searchType]);

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
            <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">

                <div className="mb-12">
                    <h1 className="text-4xl font-black text-white mb-6">Welcome Back!</h1>
                    <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center bg-white/5 p-3 rounded-[2rem] border border-white/10 shadow-2xl backdrop-blur-md">
                        <div className="relative flex-grow">
                            <input
                                type="text"
                                placeholder="Search the database for a movie or show..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full px-6 py-4 pl-14 bg-transparent border border-transparent rounded-2xl outline-none transition-all text-white text-lg placeholder:text-gray-500"
                            />
                            <svg className="w-6 h-6 absolute left-5 top-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
                            </svg>
                        </div>
                        <div className="flex bg-[#0a0a0a]/60 border border-white/5 rounded-xl p-1">
                            {['ALL', 'MOVIE', 'SERIES'].map((type) => (
                                <button
                                    key={type}
                                    onClick={() => setSearchType(type)}
                                    className={`px-5 py-2.5 rounded-lg text-xs font-black uppercase tracking-wider transition-all ${
                                        searchType === type
                                            ? 'bg-gradient-to-r from-red-600 to-red-500 text-white shadow-lg shadow-red-500/20'
                                            : 'text-gray-400 hover:text-white'
                                    }`}
                                >
                                    {type}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>

                {searchQuery !== '' ? (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <span>🔍</span> Search Results
                            </h2>
                        </div>
                        {searchResults.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {searchResults.map(movie => {
                                    const movieReviews = searchReviews[movie.id] || [];
                                    const hasReviews = movieReviews.length > 0;
                                    const latestReview = hasReviews ? movieReviews[movieReviews.length - 1] : null;
                                    const reviewerName = latestReview ? latestReview.username : '';
                                    const reviewText = latestReview ? latestReview.commentText : '';

                                    return (
                                        <div key={movie.id} onClick={() => handleMovieClick(movie)}
                                             className="bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 hover:border-red-500/30 cursor-pointer transition-all duration-300 hover:-translate-y-1 group flex overflow-hidden h-48 shadow-xl">

                                            <div className="w-32 flex-shrink-0 bg-[#0a0a0a] relative overflow-hidden rounded-l-[2rem]">
                                                {movie.posterUrl ? (
                                                    <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
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
                                                    {hasReviews ? (
                                                        <>
                                                            <p className="text-sm text-gray-300 italic line-clamp-2 relative z-10 leading-snug">
                                                                "{reviewText}"
                                                            </p>
                                                            <div className="mt-2 flex items-center gap-1.5">
                                                                <div className="w-5 h-5 rounded-full bg-gradient-to-tr from-red-600 to-red-400 flex items-center justify-center text-[10px] font-black text-white uppercase flex-shrink-0">
                                                                    {reviewerName[0]?.toUpperCase() || '?'}
                                                                </div>
                                                                <span className="text-xs font-bold text-red-400">
                                                                    {reviewerName} {reviewerName === currentUser?.name && '(You)'}
                                                                </span>
                                                            </div>
                                                        </>
                                                    ) : (
                                                        <p className="text-xs text-gray-500 font-bold uppercase tracking-wider relative z-10">
                                                            ✍️ No reviews yet. Be the first!
                                                        </p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-16 bg-gradient-to-b from-white/5 to-transparent border border-dashed border-white/10 rounded-[2.5rem]">
                                <div className="text-5xl mb-4 opacity-40">🍿</div>
                                <p className="text-gray-400 font-bold text-lg">No matching titles found.</p>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="animate-fade-in space-y-16">

                        <div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <span>👥</span> Friends' Reviews
                                </h2>
                                <button onClick={() => setView('friends_reviews')} className="text-sm text-red-500 hover:text-white font-bold transition-colors">
                                    See all →
                                </button>
                            </div>

                            {reviewedMovies.length > 0 ? (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {reviewedMovies.map(({ movie, reviews }) => {
                                        const latestReview = reviews[reviews.length - 1];
                                        const reviewerName = latestReview.username || 'Anonymous';
                                        const reviewText = latestReview.commentText || 'No comment provided.';

                                        return (
                                            <div key={movie.id} onClick={() => handleMovieClick(movie)}
                                                 className="bg-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 hover:border-red-500/30 cursor-pointer transition-all duration-300 hover:-translate-y-1 group flex overflow-hidden h-48 shadow-xl">

                                                <div className="w-32 flex-shrink-0 bg-[#0a0a0a] relative overflow-hidden rounded-l-[2rem]">
                                                    {movie.posterUrl ? (
                                                        <img src={movie.posterUrl} alt={movie.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/>
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
                                <div className="text-center py-16 bg-gradient-to-b from-white/5 to-transparent border border-dashed border-white/10 rounded-[2.5rem]">
                                    <div className="text-5xl mb-4 opacity-30">👥</div>
                                    <p className="text-gray-400 font-bold text-lg mb-1">No friends' reviews yet.</p>
                                    <p className="text-sm text-gray-500">Wait for your friends to review a title!</p>
                                </div>
                            )}
                        </div>

                        <div>
                            <div className="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <span>▶️</span> Currently Watching
                                </h2>
                                <button onClick={() => setView('my_watched')} className="text-sm text-red-500 hover:text-white font-bold transition-colors">
                                    See all →
                                </button>
                            </div>

                            {watchingList.length > 0 ? (
                                <div className="flex gap-4 overflow-x-auto pb-4 -mx-6 px-6 scrollbar-hide snap-x snap-mandatory">
                                    {watchingList.map(item => {
                                        const titleId = item.titleId ?? item.title?.id;
                                        const movie = getMovieById(titleId);
                                        const progress = getProgress(item);
                                        return (
                                            <div key={item.id} onClick={() => movie && handleMovieClick(movie)}
                                                 className="flex-none w-[280px] snap-start p-6 bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md rounded-[2rem] border border-white/10 hover:border-red-500/40 cursor-pointer transition-all duration-300 group flex flex-col gap-5 shadow-lg">

                                                <div>
                                                    <h3 className="font-bold text-white group-hover:text-red-400 transition-colors line-clamp-1 text-lg">
                                                        {movie?.title || item.titleTitle || 'Unknown Series'}
                                                    </h3>
                                                    <span className="text-xs text-gray-500 font-medium">{movie?.yearText}</span>
                                                </div>

                                                <div className="flex items-center gap-3 text-sm">
                                                    <span className="px-2.5 py-1 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-lg font-black text-xs tracking-wider shadow-md shadow-red-500/10">
                                                        S{String(item.currentSeason ?? 1).padStart(2, '0')}
                                                    </span>
                                                    <span className="text-gray-300 font-bold">
                                                        Ep {item.currentEpisode ?? item.watchedEpisodes ?? 0}
                                                        <span className="text-gray-600"> / {item.totalEpisodes ?? '?'}</span>
                                                    </span>
                                                </div>

                                                <div>
                                                    <div className="flex justify-between text-xs text-gray-500 mb-1.5 font-medium">
                                                        <span>Progress</span>
                                                        <span className="text-red-400 font-black">{progress}%</span>
                                                    </div>
                                                    <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5 border border-white/5">
                                                        <div className="h-full bg-gradient-to-r from-red-600 to-red-400 rounded-full transition-all duration-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]" style={{ width: `${progress}%` }} />
                                                    </div>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            ) : (
                                <div className="text-center py-16 bg-gradient-to-b from-white/5 to-transparent border border-dashed border-white/10 rounded-[2.5rem]">
                                    <div className="text-5xl mb-4 opacity-30">🎬</div>
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