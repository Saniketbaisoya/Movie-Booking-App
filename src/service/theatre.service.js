const { StatusCodes } = require("http-status-codes");
const Theatre = require("../models/theatre.model");

/**
 * Now there is common flow here, which is if there is error related with properties/client related error
 * Then it will be handled by the service layer itself 
 * But if there is any other error which is related to server then this will be handled by the controller layer
 * Also the server related error is thrown by service but it is handled in controller layer
 */

async function createTheatre(payloadData){
    const { name, address, description } = payloadData;
    const dataPresent = await Theatre.findOne({name, address, description});
    if(dataPresent){
        return {err:"This theatre is already present",code: StatusCodes.UNPROCESSABLE_ENTITY};
    }
    try {

        const response = await Theatre.create(payloadData);
        return response;
    } catch (error) {
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key)=> {
                err[key] = error.errors[key].message
            });
            return {err: err, code: StatusCodes.UNPROCESSABLE_ENTITY};
        }else{
            console.log(error);
            throw error;
        }
    }
}

async function getTheatreById(id){
    const theatre = await Theatre.findById({_id: id});
    if(!theatre){
        return {
            err: "No theatre found for the given id",
            code: StatusCodes.NOT_FOUND
        }
    }
    return theatre;
}

/**
 * 
 * @param {*} theatreId -> unique id of theatre for which we want to update movies...
 * @param {*} movieIds -> array of movieIds that are expected to be updated in theatre...
 * @param {*} insert  -> boolean that tells weather we want to insert the movie or remove them...
 * @returns -> It returns the updated theatre collection to the controller layer....
*/
async function updateMovieInTheatre(theatreId, movieIds, insert) {
    /**
     * Now sbse phele theatreId ko lekr hmm find krege ki theatre exists krta hai ki ni
     * If nhi krta toh custom error thrown by me, beacuse it is a client error passing wrong id
     * But if yes then we proceed further...
    */
    const theatre = await Theatre.findById(theatreId);
    if(!theatre){
        return {
            err: "No such theatre found for the provided id",
            code: StatusCodes.NOT_FOUND
        }
    }
    /**
     * Now here if the insert = true, then we need to add the movie in the theatre schema
     * now movieIds is a array property that contain multiple id's at one time
     * So we need to push all the id's at once time if insert is true, that's why we use the for each on the movieIds
    */
    if(insert){
        movieIds.forEach(movieId => {
            theatre.movies.push(movieId);
        })
        /**
         * If the insert = false, then we able to remove the movie from the theatre schema....
         * So first we take all the theatre movies in savedMovieIds then, traverse on movieIds and match the movieId with the current savedMovieIds mentioned 
         * if match then we should be filter out that movieId also when it filter/remove then after filtering we have now updated savedMovieIds
         * After that we update the theatre.movies by the updated savedMovieIds
         * Also these operations are on the memory level, but we wanted to save in the database also so then we use Theatre.save()
         * after that the updated theatre would be return to controller layer...
        */
    }else {
        let savedMovieIds = theatre.movies;
        movieIds.forEach(movieId => {
            savedMovieIds = savedMovieIds.filter(smi => smi != movieId)
        });
        theatre.movies = savedMovieIds;
    }
    await theatre.save();
    /**
     * Now here when we return the theatre then in movies there are multiple movieIds mentioned and theatre would refernce it in db i.e -> database referencing
     * Now when we do populate then it would be return all movies data of each referenced movieId
     * Isliye populate ko final updated theatre pr lgaya kyuki uss theatre ko hmm return kr rhe hai isliye....
     */
    return theatre.populate('movies');
}

module.exports = {
    createTheatre,
    getTheatreById,
    updateMovieInTheatre
}