const { StatusCodes } = require("http-status-codes");
const User = require("../models/user.model.js");

async function signUp(data){
    try {
        const response = await User.create(data);
        return response;
    } catch (error) {
        console.log(error);
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
        if(error.name == "MongoServerError"){
            if(error.errorResponse.keyPattern.name == 1){
                throw {
                    err: "This name is already present",
                    code: StatusCodes.UNPROCESSABLE_ENTITY
                }
                
            }
        }
        if(error.name == "MongoServerError"){
            if(error.errorResponse.keyPattern.email == 1){
                throw {
                    err: "This email is already present",
                    code: StatusCodes.UNPROCESSABLE_ENTITY
                }
                
            }
        }
        throw error;
    }
}
/**
 * Now yha hmm findOne ka use krr rhe hai and voh jb parameter expect krta hai to object ki form mai hme dena hoga yani key:value pair bnake....
 * And pair bnake jb hmm dete hain toh voh object hain and voh usse wrap krne bejna hoga taki parse ho ske....
*/
async function getUserByEmail(email){
    try {
        const response = await User.findOne({
            email: email
        });
        if(!response){
            throw {
                err: "No user found for the given email !!",
                code: StatusCodes.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function getUserById(userId){
    try {
        const response = await User.findById(userId);
        if(!response){
            throw {
                err: "User not found for the provied id !!",
                code: StatusCodes.NOT_FOUND
            }
        }
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

async function updateUserRoleOrUserStatus(data, userId){
    try {
        let updateQuery = {};
        if(data && data.userStatus){
            updateQuery.userStatus = data.userStatus;
        }
        if(data && data.userRole){
            updateQuery.userRole = data.userRole;
        }
        const response = await User.findByIdAndUpdate({
            id: userId
        },updateQuery, {new: true, runValidators: true});
        if(!response){
            throw {
                err: "no user found for the provided id !!",
                code: StatusCodes.NOT_FOUND
            }
        }
    }catch (error) {
        console.log(error);
        if(error.name == 'ValidationError'){
            let err = {};
            Object.keys(error.errors).map((key)=> {
                err[key] = error.errors[key].message;
            })
            throw { err: err, code: StatusCodes.UNPROCESSABLE_ENTITY };
        }
        throw error;
    }
}
module.exports = {
    signUp,
    getUserByEmail,
    getUserById,
    updateUserRoleOrUserStatus
}