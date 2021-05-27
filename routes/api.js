const router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//Not using the Controller as of right now.
// const usersController = require("../controllers/usersController");

const checkPass = async (pass1, pass2) => {
  console.log("test");
  return
}

router.post('/signUp', async (req, res) => {
  const key = ec.genKeyPair();
  const publicKey = key.getPublic('hex');
  const privateKey = key.getPrivate('hex');
  try {
    console.log(req.body);
    req.body.public_key = publicKey;
    req.body.password = await bcrypt.hash(req.body.password, 8);
    const userData = await User.create(req.body);

    //Create the sessions & Return the private key
    req.session.save(() => {
      req.session.user_id = userData._id;
      req.session.username = userData.username;
      req.session.publicKey = publicKey;
      req.session.logged_in = true;

      res.status(200).json(privateKey);
    });

  } catch (err) {
    res.status(500).json(err);
  }
});

router.post('/logIn', async (req, res) => {
  console.log(req.body);
  try {
    const userData = await User.find({ username: req.body.username });

    if (!userData) {
      res.status(400).json({ message: 'Username not found!' });
      return;
    }

    bcrypt.compare(req.body.password, userData[0].password, function (err, result) {
      if (err) {
        res.status(400).json({ message: 'Error comparing the passwords' });
      }
      if (result) {

        req.session.save(() => {
          req.session.user_id = userData[0]._id;
          req.session.username = userData[0].username;
          req.session.publicKey = userData[0].publicKey;
          req.session.logged_in = true;

          res.status(200).json({ user: userData });
        });
      } else {
        // response is OutgoingMessage object that server response http request
        return res.status(400).json({ message: 'Incorrect password' });
      }
    });



  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;