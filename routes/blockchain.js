const router = require('express').Router();
const { Blockchain, Transaction } = require('../blockchain/blockchain.js');

const blockchain = new Blockchain();

router.get('/', async (req, res) => {

});

module.exports = router;