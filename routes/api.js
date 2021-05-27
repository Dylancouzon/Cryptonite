const router = require('express').Router();
const User = require('../models/users');

//Not using the Controller as of right now.
// const usersController = require("../controllers/usersController");


router.post('/signUp', async (req, res) => {
  console.log("test");
  try {
      console.log(req.body);
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;