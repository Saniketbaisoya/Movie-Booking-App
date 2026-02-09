const { StatusCodes } = require("http-status-codes");
const Show = require("../models/show.model");
const Theatre = require("../models/theatre.model");

/**
 * Now kyuki yeah function show ko create krega
 * Toh isme bht sari required properties hogi jo chahiye hi
 * And khi bhi required parameter aate hain toh ValidationError bhi aa skta hai
*/
/**
 * @param {*} data => Object containing the details for the show creation...
 * @returns => This will return the Object that is shown new show details...
*/

/**
 * Now yha maine sbse phele yeah dekha ki jo data mai theatreId hai kya uss id pr theatre exists krta bhi hai ki ni
 * Then maine phr uske corresponding movies array mai every index pr check kiya agr each index ki value -1 hai means voh movieId nhi hai hmare theatre mai
 * Then return our client error...
 */
async function createShow(data) {
    try {
        const theatre = await Theatre.findById(data.theatreId);
        if(!theatre){
            throw {
                err: "no theatre found for the given id !!",
                code: StatusCodes.UNPROCESSABLE_ENTITY
            }
        }
        if(theatre.movies.indexOf(data.movieId) == -1){
            throw {
                err: "Movie is currently not available in the requested theatre !!",
                code: StatusCodes.NOT_FOUND
            }
        }
        const response = await Show.create(data);
        return response;
    } catch (error) {
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).forEach((key)=> {
                err[key] = error.errors[key].message
            })
            throw {
                err: err,
                code: StatusCodes.UNPROCESSABLE_ENTITY
            }
        }
        console.log(error);
        throw error;
    }
}

module.exports = {
    createShow
}