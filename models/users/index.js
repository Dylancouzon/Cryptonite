var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    username: {
        type: String,
        minlength: 6,
        unique: true
    },
    password: {
        type: String,
        minlength: 6,
        required: true,
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        unique: true
    },
    email_confirmed: {
        type: Boolean,
        default: false
    },
    public_key: {
        type: String,
        unique: true
    }
})


var Users = mongoose.model('Users', UsersSchema);

module.exports = Users;