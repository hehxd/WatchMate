import { useState, useEffect } from 'react';
import BackgroundGlows from './components/BackgroundGlows';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import FriendsReviewsPage from './pages/FriendsReviewsPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import Navbar from './components/Navbar';
import { authFetch } from './api/api';

export default function App() {
    const [view, setView] = useState('landing');
    const [selectedMovieId, setSelectedMovieId] = useState(null);
    const [moviesDB, setMoviesDB] = useState([]);

    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('watchmate_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const navigateTo = (newView) => {
        const token = localStorage.getItem('watchmate_token');
        const protectedViews = ['dashboard', 'movie_details', 'friends_reviews',
            'profile', 'edit_profile', 'to_watch',
            'my_reviews', 'my_watched'];

        if (protectedViews.includes(newView) && !token) {
            setView('landing');
            localStorage.setItem('watchmate_view', 'landing');
            return;
        }

        setView(newView);
        localStorage.setItem('watchmate_view', newView);
        window.history.pushState({ page: newView }, '', `?view=${newView}`);
    };

    useEffect(() => {
        const token = localStorage.getItem('watchmate_token');
        const protectedViews = ['dashboard', 'movie_details', 'friends_reviews',
            'profile', 'edit_profile', 'to_watch',
            'my_reviews', 'my_watched'];

        if (protectedViews.includes(view) && !token) {
            setTimeout(() => {
                setView('landing');
            }, 0);
        }
    }, [view]);

    useEffect(() => {
        const fetchTitles = async () => {
            try {
                const response = await authFetch('/titles');
                if (response.ok) {
                    const data = await response.json();
                    setMoviesDB(data);
                }
            } catch (error) {
                console.error("Failed to fetch titles", error);
            }
        };

        const protectedViews = ['dashboard', 'friends_reviews', 'profile'];
        if (protectedViews.includes(view)) {
            fetchTitles().catch(err => console.error(err));
        }
    }, [view]);

    const handleLogout = () => {
        localStorage.removeItem('watchmate_token');
        localStorage.removeItem('watchmate_user');
        localStorage.removeItem('watchmate_view');
        setCurrentUser(null);
        setMoviesDB([]);
        navigateTo('landing');
    };

    useEffect(() => {
        const handleBackButton = (event) => {
            if (event.state && event.state.page) {
                setView(event.state.page);
                localStorage.setItem('watchmate_view', event.state.page);
            }
        };
        window.addEventListener('popstate', handleBackButton);
        return () => window.removeEventListener('popstate', handleBackButton);
    }, []);

    const protectedLayout = ['dashboard', 'movie_details', 'friends_reviews',
        'profile', 'edit_profile', 'to_watch',
        'my_reviews', 'my_watched'];

    return (
        <div className="relative min-h-screen font-sans antialiased text-white bg-[#0a0a0a] overflow-hidden flex flex-col">
            <BackgroundGlows />

            <div className="flex-grow flex flex-col relative z-10 w-full">
                {protectedLayout.includes(view) ? (
                    <div className="overflow-y-auto h-screen w-full">
                        {view === 'dashboard' &&
                            <DashboardPage setView={navigateTo} setSelectedMovieId={setSelectedMovieId}
                                           movies={moviesDB} currentUser={currentUser} onLogout={handleLogout} />}
                        {view === 'friends_reviews' &&
                            <FriendsReviewsPage setView={navigateTo} setSelectedMovieId={setSelectedMovieId}
                                                movies={moviesDB} currentUser={currentUser} onLogout={handleLogout} />}
                        {view === 'movie_details' &&
                            <MovieDetailsPage setView={navigateTo} movieId={selectedMovieId}
                                              currentUser={currentUser} onLogout={handleLogout} />}
                        {view === 'profile' &&
                            <ProfilePage setView={navigateTo} setSelectedMovieId={setSelectedMovieId}
                                         movies={moviesDB} currentUser={currentUser} onLogout={handleLogout} />}
                        {view === 'edit_profile' &&
                            <EditProfilePage setView={navigateTo} currentUser={currentUser}
                                             setCurrentUser={setCurrentUser} onLogout={handleLogout} />}

                        {(view === 'to_watch' || view === 'my_reviews' || view === 'my_watched') && (
                            <div className="relative z-10 w-full min-h-screen flex flex-col animate-fade-in">
                                <Navbar setView={navigateTo} activePage={view} currentUser={currentUser}
                                        onLogout={handleLogout} />
                                <main className="flex-grow flex flex-col items-center justify-center text-center p-6">
                                    <div className="text-6xl mb-4">🚧</div>
                                    <h1 className="text-3xl font-black text-white mb-2">Coming Soon</h1>
                                    <p className="text-gray-400 mb-6">This feature is currently under development.</p>
                                    <button onClick={() => navigateTo('dashboard')}
                                            className="px-6 py-3 bg-red-600 hover:bg-red-500 rounded-xl font-bold text-white transition-all">
                                        Back to Dashboard
                                    </button>
                                </main>
                            </div>
                        )}
                    </div>
                ) : (
                    <div className="relative flex items-center justify-center flex-grow h-screen">
                        <div className="relative z-10 w-full max-w-4xl p-8 mx-4 sm:p-14 backdrop-blur-2xl bg-white/5 rounded-[2.5rem] border border-white/10 shadow-2xl">
                            {view === 'landing' && <LandingPage setView={navigateTo} />}
                            {view === 'login' && <LoginPage setView={navigateTo} setCurrentUser={setCurrentUser} />}
                            {view === 'register' && <RegisterPage setView={navigateTo} />}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}