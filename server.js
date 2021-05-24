const express = require("express");
const path = require("path");
const PORT = process.env.PORT || 3001;
const app = express();
const mongoose = require("mongoose");
const { Users } = require("./models");
const bcrypt = require('bcrypt');

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/cryptousers", {
    useNewUrlParser: true,
    useFindAndModify: false
});

// Visit the /seed get route to populate the db.
app.get("/seed", async (_req, res) => {
    const dbSeed = {
        username: "Admin1",
        password: "Admin1",
        email: "admin@admin.com",
        public_key: "123456789"
    };
    dbSeed.password = await bcrypt.hash(dbSeed.password, 10);
    Users.create(dbSeed)
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
