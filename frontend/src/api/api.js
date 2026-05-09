const BASE_URL = 'http://localhost:8080/api';

export const authFetch = async (endpoint, options = {}) => {
    const token = localStorage.getItem('watchmate_token');

    const response = await fetch(`${BASE_URL}${endpoint}`, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
            ...options.headers,
        }
    });

    if (response.status === 401) {
        localStorage.removeItem('watchmate_token');
        localStorage.removeItem('watchmate_user');
        window.location.reload();
    }

    return response;
};