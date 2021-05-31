var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    public_key: {
        type: String,
        required: true,
    },
    amount: {
        type: String,
        minlength: 6,
        required: true,
    },
    date: {
        type: Date,
        required: true,
        default: Date.now
      }
})


var Transactions = mongoose.model('Transactions', TransactionSchema);

module.exports = Transactions;