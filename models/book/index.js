var mongoose = require('mongoose');

var Schema = mongoose.Schema

var BookSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    authors: {
        type: String,
    },
    description: {
        type: String
    },
    image: {
        type: String,
    },
    link: {
        type: String,
        required: 'URL can\'t be empty',
        unique: true
    }
})

var Book = mongoose.model('Book', BookSchema);

module.exports = Book;