const router = require('express').Router();
const User = require('../models/users');

const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//Not using the Controller as of right now.
// const usersController = require("../controllers/usersController");


router.post('/signUp', async (req, res) => {
  const key = ec.genKeyPair();
  const publicKey = key.getPublic('hex');
  const privateKey = key.getPrivate('hex');
  try {
    console.log(req.body);
    req.body.public_key = publicKey;
    const userData = await User.create(req.body);
    res.status(200).json(privateKey);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;