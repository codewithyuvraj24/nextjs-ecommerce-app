import axios from 'axios';

const api = axios.create({
    baseURL: 'http://localhost:5000/api', // Env variable in production
    headers: {
        'Content-Type': 'application/json',
    },
});

api.interceptors.request.use((config) => {
    try {
        const authStorage = localStorage.getItem('auth-storage');
        if (authStorage) {
            const parsed = JSON.parse(authStorage);
            const token = parsed?.state?.token;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
    } catch (e) {
        // Ignore parse errors
    }
    return config;
});

export default api;
