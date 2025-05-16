const genreMap = {
    Action: 28,
    Comedy: 35,
    Drama: 18,
    Horror: 27,
    'Sci-Fi': 878,
    Animation: 16,
};

export function getGenreIdByName(name) {
    return genreMap[name];
}