const { default: mongoose } = require("mongoose");
const bcrypt = require('bcrypt');


const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true,
        minLength: 6,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Please fill a valid email"],
        lowercase: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        minLength: 6,
    },
    userRole: {
        type: String,
        required: true,
        default: 'CUSTOMER'
    },
    userStatus: {
        type: String,
        required: true,
        default: 'APPROVED'
    }

},{timestamps: true});

/**
 * Now yha hmm build krege instance method for comparing the plain password with the encrypt password by using bcrypt.compare(plainPassword, encryptPassword);
 * This is going to be an instance methods(validPassword) for the user, to compare a password
 * with the stored encrypted password 
 * @param  plainPassword -> input password given by the user in signin request.body
 * @returns it will return the true/false boolean which denote wheather the password is same or not ?
*/
userSchema.methods.validPassword = async function (plainPassword) {
    const currentUser = this;
    const compare = await bcrypt.compare(plainPassword, currentUser.password);
    return compare;
};


/**
 * Here we use the pre hook/trigger which is a action that perform all the logic inside in it, and it perform before or after on response.
 * Now yha hmm user ko create krne se phele uske password ko encrypt kr rhe hai, so that in future no one can access these password direclty/inDirectly inside the db even developers...
*/
userSchema.pre('save', async function (next) {
    const hashPassword = await bcrypt.hash(this.password, 10);
    this.password = hashPassword;
    next();
})

const User = mongoose.model('User',userSchema);
module.exports =  User;