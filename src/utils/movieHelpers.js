export const getUniqueRandomMovies = (arrays, count = 5) => {
    const merged = arrays.flat();

    const uniqueMap = new Map();
    merged.forEach(movie => {
        if (!uniqueMap.has(movie.id)) {
            uniqueMap.set(movie.id, movie);
        }
    });

    const uniqueMovies = Array.from(uniqueMap.values());

    const shuffled = uniqueMovies.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};