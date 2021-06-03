const router = require('express').Router();
const User = require('../models/users');
const bcrypt = require('bcrypt');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

//Not using the Controller as of right now.
// const usersController = require("../controllers/usersController");

router.post('/signUp', async (req, res) => {

  try {
    //Error checks.
    if (req.body.username.length < 6) return res.status(400).json({ message: "Your Username should be at least 6 characters." });
    if (req.body.password.length < 6) return res.status(400).json({ message: "Your Password should be at least 6 characters." });
    if (req.body.password !== req.body.confirm_password) return res.status(400).json({ message: "Your password does not match." });

    const key = ec.genKeyPair();
    const publicKey = key.getPublic('hex');
    const privateKey = key.getPrivate('hex');
    req.body.public_key = publicKey;
    req.body.password = await bcrypt.hash(req.body.password, 8);
    User.create(req.body, (err, result) => {
      if (err) {
        // Return the different Mongoose erros.
        if (err.code === 11000 && err.keyPattern.email) {
          res.status(400).json({ message: "Email already in use." });
        } else if (err.code === 11000 && err.keyPattern.username) {
          res.status(400).json({ message: "Username already in use." });
        } else {
          res.status(400).json({ message: "MongoDB error" });
        }
      } else {
        //Create the sessions & Return the private key
        req.session.save(() => {
          req.session.user_id = result._id;
          req.session.username = result.username;
          req.session.publicKey = publicKey;
          req.session.logged_in = true;

          res.status(200).json({ message: privateKey });
        });

      }
    });



  } catch (err) {
    res.status(500).json({ message: "Server Error. Please try again." });
  }
});

router.post('/logIn', async (req, res) => {
  try {
    User.find({ username: req.body.username }, (err, userData) => {
      //Checking if the user is in the DB
      if (err) {
        return res.status(400).json({ message: 'Server Error, Please try Again.' });

      } else if (!userData[0]) {
        return res.status(400).json({ message: 'Username not Found.' });

      } else {
        //Comparing the passwords
        bcrypt.compare(req.body.password, userData[0].password, function (err, result) {
          if (err) {
            return res.status(400).json({ message: 'Error decrypting Password.' });
          }
          //Creating the sessions
          if (result) {
            req.session.save(() => {
              req.session.user_id = userData[0]._id;
              req.session.username = userData[0].username;
              req.session.publicKey = userData[0].public_key;
              req.session.logged_in = true;

              res.status(200).json({ user: userData });
            });
          } else {

            return res.status(400).json({ message: 'Incorrect password.' });
          }
        });
      }
    });

  } catch (err) {
    res.status(500).json({ message: "Server Error, Please try Again." });
  }
});

router.post('/logout', (req, res) => {
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

// Delete an user route
router.delete('/delete/:private', async (req, res) => {

  const privateKey = req.params.private;
  const publicKeyDel = ec.keyFromPrivate(privateKey);
  if (publicKeyDel.getPublic('hex') !== req.session.publicKey) {
      return res.status(400).json({ message: "Keys are not Matching" });
  } else {
      User.deleteOne({ _id: req.session.user_id })
          .then(_ => {
              req.session.destroy(() => {
                  res.status(200).json({ message: "User's account has been successfully deleted." });
              });

          })
          .catch(err => {
              res.status(500).json({ message: err })
              console.log(err);
          })
  }

});

router.get('/username/:key', async (req, res) => {
  try {

    User.find({ public_key: req.params.key }, (err, userData) => {
      //Checking if the user is in the DB
      if (err) {
        return res.status(400).json({ message: 'Server Error, Please try Again.' });

      } else {
        return res.status(200).json({ message: userData[0].username });
      }
    });
  } catch (err) {
    res.status(500).json({ message: "Server Error, Please try Again." });
  }
});

router.get('/sessions', async (req, res) => {
  if(req.session.logged_in && req.session.username && req.session.publicKey){
    return res.status(200).json(req.session);
  }else{
    return res.status(200).json({logged_in:false});
  }
});


module.exports = router;