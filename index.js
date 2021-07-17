const express = require("express");
var session = require('express-session');
const path = require("path");
const app = express();

const mongoose = require("mongoose");
var MongoDBStore = require('connect-mongodb-session')(session);


require('dotenv').config();

// Acces the Database for the sessions.
//Express cannot use Mongoose.connect
var store = new MongoDBStore({
    uri: process.env.MONGODB_URI,
    collection: 'Sessions'
});

//Generate the session
app.use(session({
    secret: process.env.SECRET,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 7 // 1 week
    },
    store: store,

    resave: true,
    saveUninitialized: true
}));

//Mongoose connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useFindAndModify: false
});

// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets for heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/build"));
    app.get(['/', '/profile', '/mining', '/buy', '/send'], function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });

}

//Server side API routes.
app.use('/api', require('./routes/api'));
app.use('/api/blockchain', require('./routes/blockchain'));
app.use('/api/stripe', require('./routes/stripe'));

//Routes


// Visit the /seed get route to populate the db with data from the users.json file.
app.get("/seed", async (_req, _res) => {

    //Get the Users model & Data
    const { Users } = require("./models");
    let userData = require('./seeds/users.json');

    // To Hash the passwords :
    // const  = require('');
    // .hash(user.password, 10);

    Users.create(userData)
        .then(dbSeeded => {
            console.log(dbSeeded);
        })
        .catch(({ message }) => {
            console.log(message);
        });
});


mongoose.connection.on('open', function () {

    app.listen(3001, () => {
        console.log(`🌎 ==> API server now on port 3001!`);
    });
});