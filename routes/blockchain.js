const router = require('express').Router();
const { Blockchain, Transaction } = require('../blockchain/blockchain.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const Transactions = require('../models/transactions');
const User = require('../models/users');
var fs = require('fs');

// Create the Blockchain instance
const blockchain = new Blockchain();
blockchain.populate();

// Routes
router.get('/balance/:key', async (req, res) => {
    const result = blockchain.getBalanceOfAddress(req.params.key);

    res.status(200).json(result);
});

router.get('/transactions/:key', async (req, res) => {
    const result = blockchain.getAllTransactionsForWallet(req.params.key);
    res.status(200).json(result);
});

router.post('/transactions', async (req, res) => {
    try {
        // Check if the user has enough coins to creat this transaction.
        const balance = blockchain.getBalanceOfAddress(req.body.from);
        if (!balance) return res.status(400).json({ message: "Cannot find your balance." });
        if (req.body.amount > balance) return res.status(400).json({ message: "Insufficient funds." });

        const tx = new Transaction(req.body.from, req.body.private, req.body.to, parseInt(req.body.amount), req.body.label);
        const txKey = ec.keyFromPrivate(req.body.private);
        tx.signTransaction(txKey);

        //Collect the fees
        const fee = new Transaction(req.body.from, req.body.private, "046dde2f0162157620e0b6a2347cb5522148f35809c871bad9cfa3843b4f40f48c4fe043ea8fee6b3e07234a044138afcfc240a0854e5eeb2d587686dc4a239bcb", parseInt(req.body.amount/100), "Transaction Fee");
        fee.signTransaction(txKey);
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
            const lastCheck = blockchain.addTransaction(tx);
            const testfee =  blockchain.addTransaction(fee);
            console.log(testfee);
            if (lastCheck.sucess) {
                res.status(200).json({ message: "Sucess" });
            } else if (lastCheck.error) {
                return res.status(400).json({ message: lastCheck.error });
            } else {
                return res.status(400).json({ message: "Unknown Error" });
            }

        } else if (trans.error) {
            return res.status(400).json({ message: trans.error });
        } else {
            return res.status(400).json({ message: "Unknown Error" });
        }

    } catch (err) {
        return res.status(500).json({ message: "Server Error" });
    }
});

//Return isChainValid
router.get('/valid', async (req, res) => {

    if (blockchain.isChainValid()) {
        res.status(200).json({ message: "Sucess" });
    } else {
        res.status(400).json({ message: "Blockhain Compromised!" });
    }

});



//Returns the total number of coins
router.get('/totalCoins', async (req, res) => {
    res.status(200).json(blockchain.getNumberOfCoins());
});

router.get('/coinValue', async (req, res) => {
    Transactions.find({}, (err, data) => {
        if (err) return res.status(500).json({ message: "Server Error" });
        let total = 0;
        data.forEach(transaction => {
            total += parseInt(transaction.amount);
        })
        const value = total / blockchain.getNumberOfCoins();
        res.status(200).json(value);
    });

});

//Get the coin value day by day since it's creation
router.get('/valueData', async (req, res) => {

    let result = [];
    const creationDate = 1621987200000;
    const oneDay = 86400000;

    // Start at now, decreate the date by one day at each iteration until we reach the creation date.
    for (let nowDate = Date.now(); nowDate > creationDate; nowDate -= oneDay) {
        //Find the sum of all transactions at a specific date.
        Transactions.find({ date: { $lt: nowDate } }, (err, data) => {
            if (err) return res.status(500).json({ message: err });
            let total = 0;
            for (let transaction of data) {
                total += parseInt(transaction.amount);
            }
            const totalCoins = blockchain.getDatedCoins(nowDate);
            const thisDateResult = {
                date: nowDate,
                total_value: total,
                total_coins: totalCoins,
                usd_value: total / totalCoins
            }
            result.push(thisDateResult)

        });

    }
    setTimeout(() => res.status(200).json(result), 500)
});

router.get('/mine', async (req, res) => {

    blockchain.minePendingTransactions(req.session.publicKey);

    const jsonChain = JSON.stringify(blockchain.chain)
    fs.writeFile('./blockchain/chain.json', jsonChain, err => {
        if (err) {
            console.log('Error writing file', err)
        } else {
            res.status(200).json("sucess");
        }
    })
    
});

module.exports = router;