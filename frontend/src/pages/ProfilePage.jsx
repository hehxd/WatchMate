import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import { authFetch } from '../api/api';

export default function ProfilePage({ setView, setSelectedMovieId, movies, currentUser, onLogout }) {
    const [myReviews, setMyReviews] = useState([]);
    const [loading, setLoading] = useState(true);

    const name = currentUser?.name || 'Guest User';
    const email = currentUser?.email || 'No email provided';
    const initials = currentUser?.initials || 'GU';

    useEffect(() => {
        let isMounted = true;
        const fetchMyReviews = async () => {
            try {
                const res = await authFetch('/reviews/me');
                if (res.ok && isMounted) {
                    const data = await res.json();
                    setMyReviews(data);
                }
            } catch (err) {
                console.error('Failed to fetch reviews', err);
            } finally {
                if (isMounted) setLoading(false);
            }
        };

        fetchMyReviews().catch(err => console.error(err));

        return () => {
            isMounted = false;
        };
    }, []);

    const getMovieForReview = (review) => {
        return movies.find(m => m.id === review.titleId);
    };

    return (
        <div className="relative z-10 w-full min-h-screen flex flex-col animate-fade-in">
            <Navbar setView={setView} activePage="profile" currentUser={currentUser} onLogout={onLogout} />

            <main className="flex-grow max-w-5xl mx-auto w-full px-6 py-12">
                <div className="flex flex-col md:flex-row items-center md:items-start justify-between bg-white/5 backdrop-blur-md p-8 rounded-3xl border border-white/10 mb-12 shadow-xl">
                    <div className="flex flex-col md:flex-row items-center gap-6">
                        <div className="w-28 h-28 rounded-full bg-red-900 border-4 border-red-500 flex items-center justify-center font-black text-4xl text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] uppercase">
                            {initials}
                        </div>
                        <div className="text-center md:text-left mt-4 md:mt-0">
                            <h1 className="text-4xl font-black text-white">{name}</h1>
                            <p className="text-gray-400 mt-1">{email}</p>
                            <div className="mt-4 flex gap-3 justify-center md:justify-start">
                                <span className="px-4 py-1.5 bg-red-500/20 text-red-400 rounded-xl text-xs font-bold uppercase tracking-widest border border-red-500/20">
                                    {myReviews.length} Reviews
                                </span>
                            </div>
                        </div>
                    </div>

                    <button onClick={() => setView('edit_profile')}
                            className="mt-8 md:mt-0 px-6 py-3 bg-white/10 hover:bg-white/20 border border-white/20 rounded-xl font-bold text-white transition-all shadow-lg flex items-center gap-2 group">
                        <span className="group-hover:rotate-12 transition-transform">⚙️</span> Edit Profile
                    </button>
                </div>

                <div>
                    <h2 className="text-2xl font-bold text-white mb-6 border-b border-white/10 pb-2 flex items-center gap-2">
                        <span>📝</span> My Recent Activity
                    </h2>

                    {loading ? (
                        <p className="text-gray-400">Loading...</p>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {myReviews.length > 0 ? (
                                myReviews.map((review) => {
                                    const movie = getMovieForReview(review);
                                    return (
                                        <div key={review.id}
                                             onClick={() => {
                                                 if (movie) {
                                                     setSelectedMovieId(movie.id);
                                                     setView('movie_details');
                                                 }
                                             }}
                                             className="p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/10 hover:border-red-500/50 cursor-pointer transition-all hover:-translate-y-1 group">
                                            <div className="flex justify-between items-start mb-2">
                                                <h3 className="font-bold text-xl text-white group-hover:text-red-400 transition-colors">
                                                    {movie?.title || 'Unknown Title'}
                                                </h3>
                                                <span className="text-xs font-bold px-2 py-1 bg-white/5 border border-white/10 text-gray-300 rounded uppercase tracking-wider">
                                                    {movie?.yearText}
                                                </span>
                                            </div>
                                            <div className="mt-4 bg-[#0a0a0a]/50 p-4 rounded-xl border border-white/5">
                                                <span className="text-xs text-red-400 font-bold uppercase tracking-wider">Your Review</span>
                                                <p className="text-sm text-gray-300 italic mt-2">"{review.commentText}"</p>
                                            </div>
                                        </div>
                                    );
                                })
                            ) : (
                                <div className="col-span-full text-center py-12 bg-white/5 rounded-2xl border border-dashed border-white/20">
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