const { default: mongoose } = require("mongoose");

const movieSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        minLength : 10
    },
    description : {
        type : String,
        required : true
    },
    casts : {
        type : [String],
        required : true
    },
    trailerUrl : {
        type : [String],
        required : true
    },
    language : {
        type : String,
        required : true,
        default : 'ENGLISH'
    },
    releaseDate : {
        type : String,
        required : true
    },
    director : {
        type : String,
        required : true
    },
    releaseStatus : {
        type : String,
        required : true,
        default : 'RELEASED'
    }
},{timestamps : true}
);

const Movie = mongoose.model('Movie', movieSchema); // create a new model

module.exports = Movie; // return a model