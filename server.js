const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const mongoose = require("mongoose");
var session = require('express-session');
const { Users } = require("./models");
let userData = require('./seeds/users.json');
require('dotenv').config();

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cryptousers", {
    useNewUrlParser: true,
    useFindAndModify: false
});

const app = express();

//Initialize Express session
app.use(session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true
  }))

// Visit the /seed get route to populate the db with data from the users.json file.
app.get("/seed", async (_req, _res) => {
    //Hash the passwords
    //const bcrypt = require('bcrypt');
    //  const hashedUsers = await userData.map((user) => bcrypt.hash(user.password, 10));
    Users.create(userData)
        .then(dbSeeded => {
            console.log(dbSeeded);
        })
        .catch(({ message }) => {
            console.log(message);
        });
});


// Define middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Serve up static assets for heroku
if (process.env.NODE_ENV === "production") {
    app.use(express.static("client/public"));
}

//Routes
app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "./client/public/index.html"));
});

app.listen(PORT, () => {
    console.log(`🌎 ==> API server now on port ${PORT}!`);
});
