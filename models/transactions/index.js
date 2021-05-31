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
    }
})


var Transactions = mongoose.model('Transacations', TransactionSchema);

module.exports = Transactions;