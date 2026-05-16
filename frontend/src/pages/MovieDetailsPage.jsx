import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { authFetch } from '../api/api';

export default function MovieDetailsPage({ setView, movieId, currentUser }) {
    const [title, setTitle] = useState(null);
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [reviewText, setReviewText] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    useEffect(() => {
        if (!movieId) return;

        const fetchTitleData = async () => {
            try {
                setLoading(true);

                const [titleRes, reviewsRes] = await Promise.all([
                    authFetch(`/titles/${movieId}`),
                    authFetch(`/reviews/title/${movieId}`)
                ]);

                const titleData = await titleRes.json();
                const reviewsData = await reviewsRes.json();

                setTitle(titleData);
                setReviews(reviewsData);
            } catch (err) {
                setError('Failed to load title data.');
            } finally {
                setLoading(false);
            }
        };

        fetchTitleData();
    }, [movieId]);

    const handleReviewSubmit = async (e) => {
        e.preventDefault();

        setIsSubmitting(true);
        try {
            const res = await authFetch('/reviews', {
                method: 'POST',
                body: JSON.stringify({
                    titleId: movieId,
                    commentText: reviewText
                })
            });

            if (res.ok) {
                const newReview = await res.json();
                setReviews([...reviews, newReview]);
                setReviewText('');
            }
        } catch (err) {
        } finally {
            setIsSubmitting(false);
        }
    };

    if (loading) return (
        <div className="text-white p-10 flex justify-center items-center h-screen">
            <div className="animate-pulse flex flex-col items-center gap-4">
                <div className="w-12 h-12 border-4 border-red-500 border-t-transparent rounded-full animate-spin"></div>
                <p className="text-gray-400 font-bold tracking-widest uppercase text-sm">Loading Title</p>
            </div>
        </div>
    );

    if (error || !title) return (
        <div className="text-white p-10 flex justify-center items-center h-screen">
            <div className="bg-white/5 border border-white/10 p-8 rounded-3xl flex flex-col items-center">
                <span className="text-4xl mb-4">⚠️</span>
                <p className="font-bold text-xl">{error || 'No movie selected.'}</p>
                <button onClick={() => setView('dashboard')} className="mt-6 px-6 py-2 bg-red-600 hover:bg-red-500 rounded-xl font-bold transition-colors">
                    Go Back
                </button>
            </div>
        </div>
    );

    const activeUserName = currentUser?.name || 'Guest User';
    const myReview = reviews.find(r => r.username === activeUserName);
    const friendsReviews = reviews.filter(r => r.username !== activeUserName);
    const hasReviewed = !!myReview;

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col animate-fade-in">

            <Navbar setView={setView} activePage="movie_details" currentUser={currentUser} />

            <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">

                <button
                    onClick={() => setView('dashboard')}
                    className="mb-8 flex items-center text-gray-400 hover:text-white font-bold transition-colors w-fit group px-4 py-2 bg-white/5 rounded-xl border border-white/10"
                >
                    <span className="mr-2 group-hover:-translate-x-1 transition-transform">←</span> Back to Dashboard
                </button>

                <div className="flex flex-col md:flex-row gap-10 mb-20 bg-white/5 p-8 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-96 h-96 bg-red-500/10 blur-[100px] rounded-full pointer-events-none"></div>

                    <div className="w-full md:w-72 h-[26rem] bg-[#0a0a0a] border border-white/10 rounded-3xl flex items-center justify-center shadow-2xl flex-shrink-0 overflow-hidden relative z-10 group">
                        {title.posterUrl
                            ? <img src={title.posterUrl} alt={title.title} className="w-full h-full object-cover rounded-3xl group-hover:scale-105 transition-transform duration-700" />
                            : <span className="text-gray-600 font-bold text-2xl tracking-widest">POSTER</span>
                        }
                    </div>

                    <div className="flex flex-col justify-center relative z-10 py-4">
                        <div className="flex items-center gap-3 mb-4 flex-wrap">
                            <span className="px-4 py-1.5 bg-gradient-to-r from-red-600 to-red-500 text-white rounded-xl font-black text-xs uppercase tracking-widest shadow-lg shadow-red-500/20">
                                {title.type}
                            </span>
                            <span className="text-gray-300 font-bold px-3 py-1.5 bg-white/10 rounded-xl border border-white/10 text-xs tracking-wider">
                                {title.yearText}
                            </span>
                            {title.imdbRating && (
                                <span className="text-yellow-400 font-bold text-xs px-3 py-1.5 bg-yellow-400/10 rounded-xl border border-yellow-400/20 flex items-center gap-1">
                                    ⭐ {title.imdbRating}
                                </span>
                            )}
                        </div>

                        <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight drop-shadow-lg">{title.title}</h1>
                        <p className="text-gray-400 text-lg leading-relaxed max-w-2xl mb-10 font-medium">{title.plot}</p>

                        <div className="flex flex-wrap gap-4 items-start">
                            <div className="flex flex-col items-center">
                                <button
                                    disabled={true}
                                    className="px-8 py-4 font-bold rounded-2xl bg-white/5 text-gray-500 border border-white/10 cursor-not-allowed transition-all flex items-center gap-3 shadow-lg"
                                >
                                    <span className="text-xl">📌</span> To Watch Next
                                </button>
                                <span className="text-[10px] font-black text-red-500/70 uppercase tracking-widest mt-2 bg-red-500/10 px-2 py-0.5 rounded-md">
                                    WIP
                                </span>
                            </div>

                            <div className="flex flex-col items-center">
                                <button
                                    disabled={true}
                                    className="px-8 py-4 bg-red-900/20 text-red-400/50 border border-red-900/30 font-bold rounded-2xl cursor-not-allowed transition-all flex items-center gap-3 shadow-lg"
                                >
                                    <span className="text-xl">👁️‍🗨️</span> Mark as Watched
                                </button>
                                <span className="text-[10px] font-black text-red-500/70 uppercase tracking-widest mt-2 bg-red-500/10 px-2 py-0.5 rounded-md">
                                    WIP
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-8">

                    <div className="mb-20">
                        <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                            <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                <span>👥</span> Friends' Reviews
                            </h2>
                        </div>

                        {friendsReviews.length > 0 ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                {friendsReviews.map((review) => {
                                    const reviewerName = review.username || 'Anonymous';
                                    const reviewText = review.commentText || 'No comment provided.';

                                    return (
                                        <div key={review.id} className="p-8 bg-gradient-to-br from-white/10 to-white/5 rounded-[2rem] border border-white/10 hover:border-red-500/30 transition-all duration-300 flex flex-col justify-between shadow-xl hover:-translate-y-1 group">
                                            <div className="flex items-center gap-4 mb-6">
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-red-600 to-red-400 flex items-center justify-center text-sm font-black text-white uppercase shadow-lg shadow-red-500/30">
                                                    {reviewerName[0]?.toUpperCase() || '?'}
                                                </div>
                                                <div>
                                                    <span className="text-lg font-bold text-white block">
                                                        {reviewerName}
                                                    </span>
                                                    <span className="text-xs text-red-400 font-bold uppercase tracking-wider">Reviewer</span>
                                                </div>
                                            </div>

                                            <div className="bg-[#0a0a0a]/80 backdrop-blur-md rounded-2xl p-6 border border-white/5 relative group-hover:border-white/10 transition-colors">
                                                <div className="absolute -top-3 left-8 w-6 h-6 bg-[#0a0a0a]/80 border-t border-l border-white/5 rotate-45"></div>
                                                <p className="text-base text-gray-300 italic relative z-10 leading-relaxed font-medium">
                                                    "{reviewText}"
                                                </p>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        ) : (
                            <div className="text-center py-20 bg-gradient-to-b from-white/5 to-transparent border border-dashed border-white/10 rounded-[3rem]">
                                <div className="text-6xl mb-6 opacity-30">📭</div>
                                <h3 className="text-2xl font-bold text-white mb-3 opacity-90">It's quiet here...</h3>
                                <p className="text-gray-400 max-w-md mx-auto text-lg">
                                    None of your friends have rated <span className="text-white font-bold">{title.title}</span> yet.
                                </p>
                            </div>
                        )}
                    </div>

                    {hasReviewed && (
                        <div className="mb-20">
                            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-6">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                    <span>⭐</span> Your Review
                                </h2>
                            </div>

                            <div className="p-10 bg-gradient-to-r from-red-900/20 via-white/5 to-transparent rounded-[2.5rem] border border-red-500/30 relative overflow-hidden shadow-2xl">
                                <div className="absolute top-0 left-0 w-2 h-full bg-red-500"></div>

                                <div className="flex items-center gap-4 mb-6">
                                    <div className="w-14 h-14 rounded-full bg-red-500 text-white flex items-center justify-center text-xl font-black uppercase ring-4 ring-red-500/20">
                                        {activeUserName[0]?.toUpperCase() || '?'}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-3">
                                            <span className="text-xl font-black text-white block">
                                                {activeUserName}
                                            </span>
                                            <span className="text-[10px] bg-red-500 text-white px-2 py-1 rounded-lg uppercase tracking-widest font-bold">You</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="bg-[#0a0a0a]/60 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                                    <p className="text-lg text-white italic leading-relaxed">
                                        "{myReview.commentText || 'No comment provided.'}"
                                    </p>
                                </div>
                            </div>
                        </div>
                    )}

                    {!hasReviewed && (
                        <div className="mt-12 p-10 bg-gradient-to-br from-white/10 to-white/5 rounded-[2.5rem] border border-white/10 shadow-2xl relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-64 h-64 bg-red-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                            <div className="relative z-10">
                                <h3 className="text-2xl font-bold text-white mb-2">Share Your Thoughts</h3>
                                <p className="text-gray-400 mb-8">What did you think about {title.title}? Leave a review for your friends.</p>

                                <form onSubmit={handleReviewSubmit} className="flex flex-col gap-6">
                                    <textarea
                                        value={reviewText}
                                        onChange={(e) => setReviewText(e.target.value)}
                                        placeholder="Write your review here... (Leave empty to test validation)"
                                        className="w-full bg-[#0a0a0a] text-white border border-white/10 rounded-2xl p-6 min-h-[160px] focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-all resize-y text-lg placeholder:text-gray-600 shadow-inner"
                                    />
                                    <div className="flex justify-end">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="px-10 py-4 bg-gradient-to-r from-red-600 to-red-500 hover:from-red-500 hover:to-red-400 disabled:opacity-50 disabled:from-red-600 text-white font-black rounded-2xl transition-all shadow-lg shadow-red-500/25 hover:shadow-red-500/40 hover:-translate-y-1 text-lg"
                                        >
                                            {isSubmitting ? 'Posting...' : 'Publish Review'}
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    )}
                </div>

            </main>
        </div>
    );
}