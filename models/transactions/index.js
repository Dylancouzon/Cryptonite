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
        default: Date.now
      }
})


var Transactions = mongoose.model('Transacations', TransactionSchema);

module.exports = Transactions;