const { StatusCodes } = require("http-status-codes");
const Show = require("../models/show.model");

/**
 * Now kyuki yeah function show ko create krega
 * Toh isme bht sari required properties hogi jo chahiye hi
 * And khi bhi required parameter aate hain toh ValidationError bhi aa skta hai
*/
/**
 * @param {*} data => Object containing the details for the show creation...
 * @returns => This will return the Object that is shown new show details...
*/
async function createShow(data) {
    try {
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