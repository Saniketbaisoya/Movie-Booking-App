const Movie = require("../models/movie");


async function createMovie(data) {
    try {
        const movie = await Movie.create(data);
        return movie;
    } catch (error) {
        if(error.name == 'ValidationError'){
            Object.keys(error.errors).forEach((key)=> {
                return error.errors[key].message;
            });
        }else {
            throw error;
        }
    }
}

async function getMovieById(id) {
    const movie = await Movie.findById(id);
    return movie;
}
module.exports = {
    createMovie,
    getMovieById
}