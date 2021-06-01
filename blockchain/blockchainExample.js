const { Blockchain, Transaction } = require('./blockchain');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Create new instance of Blockchain class
const blockchain = new Blockchain();

console.log('Blockchain valid?', blockchain.isChainValid() ? 'Yes' : 'No');
