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
    const findFirst = await Movie.findById(id);
    if(!findFirst){
        return{
            err: "No movie record found for the id provided !!",
            code: StatusCodes.NOT_FOUND
        }
    }
    const response = await Movie.deleteOne({_id : id});
    /**
     * if we wants to delete a movie but than there is no movie to delete....
     * But byDefault they try delete the empty movie from database
     * So this i will confirm by the deleteCount if it is 0 that means it no data is delete 
     * So before sending the response to the controller we check if the deleteCount is 0 that means no record present to delete from database
     * So we throw a custom error in err with StatusCodes.NOT_FOUND in code to controller
     */
    if(response.deletedCount == 0){
        return {
            err: "No movie found for further deletion !!",
            code: StatusCodes.NOT_ACCEPTABLE
        }
    }
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
async function searchMovie(filterData){
    let query = {};
    if(filterData.name){
        query.name = filterData.name;
    }
    let movies = await Movie.find(query);
    if(movies.length <= 0){
        return {err: "Not able to fetch the query movies", code: StatusCodes.NOT_FOUND};
    }
    return movies;
}
module.exports = {
    createMovie,
    getMovieById,
    deleteMovie,
    updateMovie,
    searchMovie
}