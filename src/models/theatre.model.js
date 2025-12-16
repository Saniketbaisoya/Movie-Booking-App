const mongoose = require('mongoose');

const theatreSchema = new mongoose.Schema({
    name : {
        type: String,
        required: true
    },
    // agr koi aisa key jisme koi bhi type ke validations hmm nhi rkhna chahte hain,
    // toh uss case mai hmm uska directly type define krke usko vhi declare kr skte hai,
    // instead of using {} then type.
    description: String,
    city : {
        type: String,
        required: true,
    },
    pincode: {
        type: Number,
        required: true,
    },
    address: String

},{timestamps: true});

const Theatre = mongoose.model("Theatre",theatreSchema);

module.exports = Theatre;