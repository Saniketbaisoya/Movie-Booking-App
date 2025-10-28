const { default: mongoose } = require("mongoose");
const { MONGODB_URL } = require("./serverConfig");


async function connectDb(){
    try {
        await mongoose.connect(MONGODB_URL);
        console.log('SuccessFully Connected to the db server...')
    } catch (error) {
        console.log('Failed to connect to MongoDb...');
        console.log(error);
    }
}
module.exports = connectDb;