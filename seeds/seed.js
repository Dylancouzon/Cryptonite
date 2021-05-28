let mongoose = require('mongoose');
let db = require('../models');
let userSeed = require('./users.json');

mongoose.connect('mongodb://localhost/cryptousers', {
  useNewUrlParser: true,
  useFindAndModify: false
});

db.Users.deleteMany({})
  .then(() => db.Users.collection.insertMany(userSeed))
  .then(data => {
    console.log(data.result.n + " records inserted!");
    process.exit(0);
  })
  .catch(err => {
    console.error(err);
    process.exit(1);
  });