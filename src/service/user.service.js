const User = require("../models/user.model.js");

async function signUp(data){
    try {
        const response = await User.create(data);
        return response;
    } catch (error) {
        console.log(error);
        throw error;
    }
}

module.exports = {
    signUp
}