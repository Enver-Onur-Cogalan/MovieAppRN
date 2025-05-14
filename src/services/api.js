import axios from 'axios';

const API_KEY = '080c9ef01b944f5acf18a043bb96a110';
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
