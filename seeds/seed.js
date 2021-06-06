let mongoose = require('mongoose');
let db = require('../models');
let userSeed = require('./users.json');
let transactionSeed = require('./transactions.json');

mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/cryptousers', {
  useNewUrlParser: true,
  useFindAndModify: false
});
db.Users.deleteMany({})
  .then(() => db.Users.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });

  db.Transactions.deleteMany({})
  .then(() => db.Transactions.collection.insertMany(transactionSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });