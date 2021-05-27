const router = require('express').Router();
const User = require('../models/users');

router.post('/signUp', async (req, res) => {
  try {
      console.log(req.body);
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;