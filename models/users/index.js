var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var UsersSchema = new Schema({
    username: {
        type: String,
        minlength: 6,
        required: true,
        unique: true
    },
    password: {
        type: String,
    },
    email: {
        type: String,
        match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
        required: 'This Email adress is already being used.',
        unique: true
    },
    email_confirmed: {
        type: Boolean,
        default: false
    },
    public_key: {
        type: String,
        required: 'URL can\'t be empty',
        unique: true
    }
})


var Users = mongoose.model('Users', UsersSchema);

module.exports = Users;