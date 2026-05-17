import { useState, useEffect } from 'react';
import BackgroundGlows from './components/BackgroundGlows';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import DashboardPage from './pages/DashboardPage';
import MovieDetailsPage from './pages/MovieDetailsPage';
import FriendsReviewsPage from './pages/FriendsReviewsPage';
import MyReviewsPage from './pages/MyReviewsPage';
import ProfilePage from './pages/ProfilePage';
import EditProfilePage from './pages/EditProfilePage';
import Navbar from './components/Navbar';
import ComingSoonPlaceholder from './components/ComingSoonPlaceholder';
import { authFetch } from './api/api';


export default function App() {
    const protectedLayout = [
        'dashboard', 'movie_details', 'friends_reviews',
        'profile', 'edit_profile', 'watch_later',
        'my_reviews', 'my_watched', 'watching_currently'
    ];

    const [view, setView] = useState(() => {
        const savedView = localStorage.getItem('watchmate_view') || 'landing';
        const token = localStorage.getItem('watchmate_token');
        if (protectedLayout.includes(savedView) && !token) {
            return 'landing';
        }
        return savedView;
    });

    const [selectedMovieId, setSelectedMovieId] = useState(() => {
        return localStorage.getItem('watchmate_movie_id') || null;
    });

    const [moviesDB, setMoviesDB] = useState([]);

    const [currentUser, setCurrentUser] = useState(() => {
        const savedUser = localStorage.getItem('watchmate_user');
        return savedUser ? JSON.parse(savedUser) : null;
    });

    const navigateTo = (newView) => {
        const token = localStorage.getItem('watchmate_token');

        if (protectedLayout.includes(newView) && !token) {
            setView('landing');
            localStorage.setItem('watchmate_view', 'landing');
            return;
        }

        setView(newView);
        localStorage.setItem('watchmate_view', newView);
        window.history.pushState({ page: newView }, '', `?view=${newView}`);
    };

    useEffect(() => {
        if (selectedMovieId) {
            localStorage.setItem('watchmate_movie_id', selectedMovieId);
        }
    }, [selectedMovieId]);

    useEffect(() => {
        const token = localStorage.getItem('watchmate_token');

        if (protectedLayout.includes(view) && !token) {
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

        if (protectedLayout.includes(view)) {
            fetchTitles().catch(err => console.error(err));
        }
    }, [view]);

    const handleLogout = () => {
        localStorage.removeItem('watchmate_token');
        localStorage.removeItem('watchmate_user');
        localStorage.removeItem('watchmate_view');
        localStorage.removeItem('watchmate_movie_id');
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

    return (
        <div className="relative min-h-screen font-sans antialiased text-white bg-[#0a0a0a] overflow-hidden flex flex-col">
            <BackgroundGlows />

            <div className="flex-grow flex flex-col relative z-10 w-full">
                {protectedLayout.includes(view) ? (
                    <div className="flex flex-col h-screen w-full">
                        <Navbar setView={navigateTo} activePage={view} currentUser={currentUser} onLogout={handleLogout} />

                        <div className="overflow-y-auto flex-grow w-full">
                            {view === 'dashboard' &&
                                <DashboardPage setView={navigateTo} setSelectedMovieId={setSelectedMovieId}
                                               movies={moviesDB} currentUser={currentUser} onLogout={handleLogout} />}
                            {view === 'friends_reviews' &&
                                <FriendsReviewsPage setView={navigateTo} setSelectedMovieId={setSelectedMovieId}
                                                    movies={moviesDB} currentUser={currentUser} onLogout={handleLogout} />}
                            {view === 'my_reviews' &&
                                <MyReviewsPage setView={navigateTo} setSelectedMovieId={setSelectedMovieId}
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

                            {(view === 'watching_currently' || view === 'watch_later' || view === 'my_watched') && (
                                <ComingSoonPlaceholder setView={navigateTo} />
                            )}
                        </div>
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