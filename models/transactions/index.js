var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var TransactionSchema = new Schema({
    public_key: {
        type: String,
        required: true,
    },
    amount: {
        type: Number,
        required: true,
    },
    date: {
        type:Number, 
        default: new Date().getTime()
      }
})


var Transactions = mongoose.model('Transactions', TransactionSchema);

module.exports = Transactions;