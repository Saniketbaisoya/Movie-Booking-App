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

/**
 * Now yha hmne use kiya hai deleteOne
 * Now jb bhi yeah delete krta hai toh yeah basically do parameters deta hai 
 * First is acknowledged or deleteCount now if the acknowledged is true that means the deleteOne is working but if false then not working
 * DeleteCount basically determines that how many data is deleted, but delete atmost one regardless of the single option.
*/
async function deleteMovie(id) {
    const response = await Movie.deleteOne({_id : id});
    return response;
}
module.exports = {
    createMovie,
    getMovieById,
    deleteMovie
}