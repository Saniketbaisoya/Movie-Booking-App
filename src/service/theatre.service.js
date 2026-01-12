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
    const dataPresent = await Theatre.findOne({
        $or: [
            { name },
            { address },
            { description }
        ]
    });
    if(dataPresent){
        if(dataPresent.name == name ){
            message = "This theatre is already present at this name";
        }else if(dataPresent.address == address ){
            message = "This theatre is already present at this address";
        }else if(dataPresent.description == description ){
            message = "This theatre is already present at this description";
        }
        return {
            err: message, 
            code: StatusCodes.UNPROCESSABLE_ENTITY
        };  
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
            return {
                err: err,
                code: StatusCodes.UNPROCESSABLE_ENTITY
            };
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

async function getAllTheatre(data){
    try {
        let query = {};
        if(data && data.city){
            query.city = data.city
        }
        if(data && data.pincode){
            query.pincode = data.pincode
        }
        if(data && data.name){
            query.name = data.name
        }
        /**
         * Now yha sbse phele maine dekha ki data mai movieId hai ki nhi
         * Then agr movieId hain toh movieId ko query mai dalege
         * Now query mai jb hmm dalege toh movies field ko create krke then hmm usko add krege in the query
         * Kyuki query hi hmara final variable hai jiske basis pr hmm theatre ki filteration krte hain....
         * Now also Theatre schema mai movies krke field hain lekin voh array format mai hain
         * Now array format mai hai toh lekin query ka movies ko bhi array mai bnane ke liye, hmne yha data.movieId ko array mai dalkr then usko insert kiya in movies of query
         * that's why we use the $all, this is the imp case....
         */
        if(data && data.movieId){
            query.movies = {$all: data.movieId}
        }
        const response = await Theatre.find(query);
        if(!response){
            return {
                err: "No theatre records present !!",
                code: StatusCodes.NOT_FOUND
            }
            
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
} 
/**
 * 
 * @param {*} theatreId -> unique id of theatre for which we want to update movies...
 * @param {*} movieIds -> array of movieIds that are expected to be updated in theatre...
 * @param {*} insert  -> boolean that tells weather we want to insert the movie or remove them...
 * @returns -> It returns the updated theatre collection to the controller layer....
*/
// async function updateMovieInTheatre(theatreId, movieIds, insert) {
//     /**
//      * Now sbse phele theatreId ko lekr hmm find krege ki theatre exists krta hai ki ni
//      * If nhi krta toh custom error thrown by me, beacuse it is a client error passing wrong id
//      * But if yes then we proceed further...
//     */
//     const theatre = await Theatre.findById(theatreId);
//     if(!theatre){
//         return {
//             err: "No such theatre found for the provided id",
//             code: StatusCodes.NOT_FOUND
//         }
//     }
//     /**
//      * Now here if the insert = true, then we need to add the movie in the theatre schema
//      * now movieIds is a array property that contain multiple id's at one time
//      * So we need to push all the id's at once time if insert is true, that's why we use the for each on the movieIds
//     */
//     if(insert){
//         movieIds.forEach(movieId => {
//             theatre.movies.push(movieId);
//         })
//         /**
//          * If the insert = false, then we able to remove the movie from the theatre schema....
//          * So first we take all the theatre movies in savedMovieIds then, traverse on movieIds and match the movieId with the current savedMovieIds mentioned 
//          * if match then we should be filter out that movieId also when it filter/remove then after filtering we have now updated savedMovieIds
//          * After that we update the theatre.movies by the updated savedMovieIds
//          * Also these operations are on the memory level, but we wanted to save in the database also so then we use Theatre.save()
//          * after that the updated theatre would be return to controller layer...
//         */
//     }else {
//         let savedMovieIds = theatre.movies;
//         movieIds.forEach(movieId => {
//             savedMovieIds = savedMovieIds.filter(smi => smi != movieId)
//         });
//         theatre.movies = savedMovieIds;
//     }
//     await theatre.save();
//     /**
//      * Now here when we return the theatre then in movies there are multiple movieIds mentioned and theatre would refernce it in db i.e -> database referencing
//      * Now when we do populate then it would be return all movies data of each referenced movieId
//      * Isliye populate ko final updated theatre pr lgaya kyuki uss theatre ko hmm return kr rhe hai isliye....
//      */
//     return theatre.populate('movies');
// }

/**
 * @param {*} theatreId -> unique id of theatre for which we want to update movies...
 * @param {*} movieIds -> array of movieIds that are expected to be updated in theatre...
 * @param {*} insert  -> boolean that tells weather we want to insert the movie or remove them...
 * @returns -> It returns the updated theatre collection to the controller layer....
*/
async function updateMovieInTheatre(theatreId, movieIds, insert){
    try {
        // add the movie...
        if(insert){ 
            await Theatre.updateOne(
                {_id: theatreId},
                // {$push: {movies: {$each: movieIds}}}
                {$addToSet: {movies: {$each: movieIds}}}
            )
        }else{
            // remove the movie from theatre...
            await Theatre.updateOne(
                {_id: theatreId},
                {$pull: {movies: {$in: movieIds}}}
            )
        }
        const theatre = await Theatre.findById(theatreId);
        if(!theatre){
            return {
                err: "No such theatre found for the provided id",
                code: StatusCodes.NOT_FOUND
            }
        }
        return theatre.populate('movies');
    } catch (error) {
        console.log(error);
        throw error;
    }
}
// 1 means show, 0 means not show in the json object...
async function getAllMoviesInTheatre(theatreId){
    const response = await Theatre.findById(theatreId, {name : 1, address: 1, movies: 1});
    if(!response){
        return {
            err: "no such theatre found for the provided id",
            code: StatusCodes.NOT_FOUND
        }
    }
    return response.populate('movies');
}


async function deleteTheatre(id){
    const findFirst = await Theatre.findOne({_id: id});
    if(!findFirst){
        return{
            err: "No theatre found for the given id",
            code: StatusCodes.NOT_FOUND
        }
    }
    const response = await Theatre.deleteOne({_id: id});
    if(response.deletedCount == 0){
        return{
            err: 'No theatre is presnt for further deletion !!',
            code: StatusCodes.NOT_ACCEPTABLE
        }
    }
    return response;
}

async function updateTheatre(id, data){
    const response = await Theatre.findByIdAndUpdate(id, data);
    if(!response){
        return {
            err: "No theatre found for the given id",
            code: StatusCodes.NOT_FOUND
        }
    }
}

/**
 * 
 * @param {*} theatreId -> theatreId uss theatre ki jisme hme search krna hai movie ko
 * @param {*} movieId -> yeah movieId uss movie ki hai jisko search krna hai inside the theatre which is given along with the given theatreId
 * @returns response.movies.indexOf(movieId) != (-1) So sbse phele isme theatreId ka use krke hmne theatre find kiya now abb response mai pure theatre ka collection hai
 * Now abb is response ke andr jakr hmm dekhege movies mai ki movieId jo given hai parameter mai voh present hai ki nhi
 * Now yha response.movies krke pure movies of list ka access hai, Now isi ke upr hmne indexOf lgaya hai and indexOf mai hmne pass kiya movieId 
 * Now indexOf return krta hai -1 or 1 now voh dekhega ki yeah movieId hmari present hai ki nhi agr hai toh return krega 1 and agr nhi hai toh -1
 * Now yha hmne data ko numbers mai convert krdiya kyuki hmme bss yeah hi dekhna tha ki voh movie uss theatre mai available hai ki nhi 
 * and at last we do response.movies,indexOf(movieId) != -1 => true and agr equal hua toh ayega false....
 */
async function checkMovieInTheatre(theatreId, movieId){
    try {
        const response = await Theatre.findById(theatreId);
        if(!response){
            return {
                err: "No theatre found for the given id !!",
                code: StatusCodes.NOT_FOUND
            }
        }
        return response.movies.indexOf(movieId) != (-1);
    } catch (error) {
        console.log(error);
        throw error;
    }
}
module.exports = {
    createTheatre,
    getTheatreById,
    getAllTheatre,
    deleteTheatre,
    updateTheatre,
    updateMovieInTheatre,
    getAllMoviesInTheatre,
    checkMovieInTheatre
}