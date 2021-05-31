const router = require('express').Router();
const { Blockchain, Transaction } = require('../blockchain/blockchain.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');

// Create the Blockchain instance
const blockchain = new Blockchain();

//Create the first few transactions.

//Mine the Genesis block
blockchain.minePendingTransactions("046dde2f0162157620e0b6a2347cb5522148f35809c871bad9cfa3843b4f40f48c4fe043ea8fee6b3e07234a044138afcfc240a0854e5eeb2d587686dc4a239bcb");
console.log("Genesis Block mined!");


console.log("Coins generated");


blockchain.minePendingTransactions("0489e85126ff72d30b6118b6b6bcc0f4a7a7899bf191af80237d6e4784865aa7f5394f5a619351ecd0a76c78e5f989738351d41a5215a801ce4b8e36707047233f");
console.log("Block Mined by Liam");

//Admin send 100 coins to Dylan
const tx1 = new Transaction("046dde2f0162157620e0b6a2347cb5522148f35809c871bad9cfa3843b4f40f48c4fe043ea8fee6b3e07234a044138afcfc240a0854e5eeb2d587686dc4a239bcb", '046c6dbe58d175935e2d4db1b29a926f2ceaf8b362e97e63c5477e4e3d6fa0efeb8287b1538a7b61eb72140e9ff03a1e703ff6cdab53d19e9a49a9d8e162958978', 100);
const tx1Key = ec.keyFromPrivate('8b13559111bb98f7e34d6ffa55784336c829d6ae969680ee6a49b3e6408f96c0');
tx1.signTransaction(tx1Key);
blockchain.addTransaction(tx1);
console.log("Admin sends 100 coins to Dylan");

//Liam sends 500 coins to Jake
const tx2 = new Transaction('0489e85126ff72d30b6118b6b6bcc0f4a7a7899bf191af80237d6e4784865aa7f5394f5a619351ecd0a76c78e5f989738351d41a5215a801ce4b8e36707047233f', '04607ee359622c2e0a0fd8f963c68655968107dd3f8f538a911e50aa8a0bfc922130b584dd21c66c267ee38a6581146f95e8291c16fb053730764864e57a927f6f', 50000);
const tx2Key = ec.keyFromPrivate('1ec87e0d86f325d124d08b3515bccb59a92cc5c6cfbfb0dc69e26a5e8c730a40');
test = tx2.signTransaction(tx2Key);
blockchain.addTransaction(tx2);

console.log(test);

//Cheng Mines the block
blockchain.minePendingTransactions("046fb09bf6a546b32f95cd0d82f3c37c5fe0857086122d0d448f50e8dd260972178e05c0721e226cd85c180fe7869d66319d70122c79408b899f892af582e7c9a8");
console.log("Cheng Mines the Block");


console.log(`Balance of Admin is ${blockchain.getBalanceOfAddress("046dde2f0162157620e0b6a2347cb5522148f35809c871bad9cfa3843b4f40f48c4fe043ea8fee6b3e07234a044138afcfc240a0854e5eeb2d587686dc4a239bcb")}`);
console.log(`Balance of dylan is ${blockchain.getBalanceOfAddress("046c6dbe58d175935e2d4db1b29a926f2ceaf8b362e97e63c5477e4e3d6fa0efeb8287b1538a7b61eb72140e9ff03a1e703ff6cdab53d19e9a49a9d8e162958978")}`);
console.log(`Balance of cheng is ${blockchain.getBalanceOfAddress("046fb09bf6a546b32f95cd0d82f3c37c5fe0857086122d0d448f50e8dd260972178e05c0721e226cd85c180fe7869d66319d70122c79408b899f892af582e7c9a8")}`);
console.log(`Balance of liam is ${blockchain.getBalanceOfAddress("0489e85126ff72d30b6118b6b6bcc0f4a7a7899bf191af80237d6e4784865aa7f5394f5a619351ecd0a76c78e5f989738351d41a5215a801ce4b8e36707047233f")}`);
console.log(`Balance of jake is ${blockchain.getBalanceOfAddress("04607ee359622c2e0a0fd8f963c68655968107dd3f8f538a911e50aa8a0bfc922130b584dd21c66c267ee38a6581146f95e8291c16fb053730764864e57a927f6f")}`);



// Routes
router.get('/balance/:key', async (req, res) => {
    const result = blockchain.getBalanceOfAddress(req.params.key);

    res.json(result);
});

router.get('/transactions/:key', async (req, res) => {
    const result = blockchain.getAllTransactionsForWallet(req.params.key);
    res.json(result);
});

router.post('/transactions', async (req, res) => {
    try {
        console.log(req.body);
        // Check if the user has enough coins to creat this transaction.
        const balance = blockchain.getBalanceOfAddress(req.body.from);
        if (!balance) return res.status(400).json({ message: "Cannot find your balance." });
        if (req.body.amount > balance) return res.status(400).json({ message: "Insufficient funds." });

        const tx = new Transaction(req.body.from, req.body.to, req.body.amount, req.body.label);
        const txKey = ec.keyFromPrivate(req.body.private);
        tx.signTransaction(txKey);
        /*
        Security checks 
            - All fields are completed
            - Keys are Matching
            - Amount > 0
            - Balance > 0
            - Balance > amount
            - Hash succeded
            - Check everything again before pushing into the block.
        */
        const trans = tx.isValid();
        if (trans === true) {
            lastCheck = blockchain.addTransaction(tx);

            if (lastCheck.sucess) {
                res.status(200).json({ message: "Sucess" });
            } else if (lastCheck.error) {
                return res.status(400).json({ message: lastCheck.error });
            } else {
                return res.status(400).json({ message: "Unknown Error" });
            }

        } else if (trans.error) {
            console.log(trans.error);
            return res.status(400).json({ message: trans.error });
        } else {
            return res.status(400).json({ message: "Unknown Error" });
        }

    } catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }
});

router.get('/valid', async (req, res) => {
    res.json(blockchain.isChainValid());
});

module.exports = router;