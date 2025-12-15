const { StatusCodes } = require("http-status-codes");
const Movie = require("../models/movie");


async function createMovie(data) {
    try {
        const movie = await Movie.create(data);
        return movie;
    } catch (error) {
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key)=> {
                err[key] =  error.errors[key].message;
            });
            return {err: err, code: StatusCodes.UNPROCESSABLE_ENTITY};
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

/**
 * Now service layer mai hmne client side error ko validate kiya and agr client side error ke alava or koi error hai toh voh direclty throw error hojayega
 * Now client side ke error ke messages ko joki error.errors mai message key property hai usko return kr rhe hain...
 * And also error ka code hai usko bhi yhi likh liya now err mai err ko dalke or code mai client ke code ko dalkr return krdiya controller ko
 * 
*/
async function updateMovie(id, data){
    try {
        const response = await Movie.findByIdAndUpdate(id, data, {new: true, runValidators: true});
        return response;
    } catch (error) {
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key)=> {
                err[key] =  error.errors[key].message;
            });
            return {err: err, code: StatusCodes.UNPROCESSABLE_ENTITY};
        }else {
            throw error;
        }
    }
    
}
module.exports = {
    createMovie,
    getMovieById,
    deleteMovie,
    updateMovie
}