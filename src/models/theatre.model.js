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
    address: String,
    /**
     * Now yha hmne kri hai manual referencing, mtlb hmm yha dusre model -> Movie uski id's ko store krege
     * Also yha hmm movies mai sirf ek movieId ko store nhi krege, multiple id's ko store krege 
     * Because the theatre has many movies, isliye yha ref: 'Movie' yani ref mai voh model define kiya jiski id's store hogi
     * And type ko ek array based bnaya, phele [ ] diya then usme type define kiya taki jo field hai voh ek aaray ki trh us type of data ko store kr ske....
    */
    movies: {
        type: [mongoose.Schema.Types.ObjectId],
        ref: 'Movie'
    }

},{timestamps: true});

const Theatre = mongoose.model("Theatre",theatreSchema);

module.exports = Theatre;