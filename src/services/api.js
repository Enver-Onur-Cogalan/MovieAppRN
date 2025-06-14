import axios from 'axios';

const API_KEY = 'XXX';
const BASE_URL = 'https://api.themoviedb.org/3';

const api = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
        language: 'en-US',
    },
});

export const fetchPopularMovies = async () => {
    const response = await api.get('/movie/popular');
    return response.data.results;
};

export const fetchTopRatedMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/top_rated`, {
        params: { api_key: API_KEY }
    });
    return response.data.results;
};

export const fetchNowPlayingMovies = async () => {
    const response = await axios.get(`${BASE_URL}/movie/now_playing`, {
        params: { api_key: API_KEY }
    });
    return response.data.results;
};

export const fetchMovieDetails = async (movieId) => {
    const response = await api.get(`/movie/${movieId}`);
    return response.data;
};

export const searchMoviesByGenre = async (genreId) => {
    const response = await api.get('/discover/movie', {
        params: {
            with_genres: genreId,
        },
    });
    return response.data.results;
};

export const searchMoviesByRating = async (minRating) => {
    const response = await api.get('/discover/movie', {
        params: {
            'vote_average.gte': minRating,
        },
    });
    return response.data.results;
};

export const getRandomMovies = (moviesArray, count = 5) => {
    const shuffled = [...moviesArray].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const fetchMovieCredits = async (movieId) => {
    try {
        const response = await axios.get(`${BASE_URL}/movie/${movieId}/credits`, {
            params: {
                api_key: API_KEY,
            },
        });
        return response.data.cast;
    } catch (error) {
        console.error('Error fetching movie credits:', error);
        return [];
    }
};

export const searchMovies = async (query, page = 1) => {
    if (!query) return [];

    const url = `${BASE_URL}/search/movie`;
    const params = {
        api_key: API_KEY,
        query,
        page,
    };

    const response = await axios.get(url, { params });
    return {
        results: response.data.results,
        totalPages: response.data.total_pages,
        currentPage: response.data.page,
    };
};

export const fetchActorDetails = async (actorId) => {
    const response = await axios.get(`${BASE_URL}/person/${actorId}`, {
        params: { api_key: API_KEY },
    });
    return response.data;
};

export const fetchActorCredits = async (actorId) => {
    const response = await axios.get(`${BASE_URL}/person/${actorId}/movie_credits`, {
        params: { api_key: API_KEY },
    });
    return response.data.cast;
};
