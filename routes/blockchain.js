const router = require('express').Router();
const { Blockchain, Transaction } = require('../blockchain/blockchain.js');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
const Transactions = require('../models/transactions');
const User = require('../models/users');
var fs = require('fs');
const crypto = require('crypto');
const { StaticPool } = require("node-worker-threads-pool");

//Absolute path to the worker.
const filePath = "./blockchain/worker.js";

/**
 * 
 * Creates the Blockchain Instance & Populate(seed) it from the Json file.
 * 
 */
var blockchain = new Blockchain();
blockchain.populate();


/**
 * 
 * Clone the Blockchain into 9 nodes. 
 * 
 */
var nodes = [];
setTimeout(() => {
    for (let i = 0; i < 9; i++) {
        nodes[i] = Object.assign(Object.create(Object.getPrototypeOf(blockchain)), blockchain);
    }
}, 500)


/**
 * 
 * Returns the balance for a specific Public Key
 * 
 */
router.get('/balance/:key', async (req, res) => {
    const result = blockchain.getBalanceOfAddress(req.params.key);

    res.status(200).json(result);
});

/**
 * 
 * Returns the full list of transaction for a specific public Key
 * 
 */
router.get('/transactions/:key', async (req, res) => {
    const result = blockchain.getAllTransactionsForWallet(req.params.key);
    res.status(200).json(result);
});

/**
 * Transaction API Call
 *         Security checks 
            - All fields are completed
            - Keys are Matching
            - Amount > 0
            - Balance > 0
            - Balance > amount
            - Hash succeded
            - Check everything again before pushing into the block.
 */
router.post('/transactions', async (req, res) => {
    try {

        // Check if the user has enough coins to creat this transaction.
        const balance = blockchain.getBalanceOfAddress(req.body.from);
        if (!balance) return res.status(400).json({ message: "Cannot find your balance." });
        if (req.body.amount > balance) return res.status(400).json({ message: "Insufficient funds." });

        // Create a transaction instance.
        const tx = new Transaction(req.body.from, req.body.private, req.body.to, parseInt(req.body.amount), req.body.label);
        //Generate the Public Key from Private to check if they are Matching
        const txKey = ec.keyFromPrivate(req.body.private);
        //Sign the transaction with the key and Generate the Hash
        tx.signTransaction(txKey);

        //Send the fees to BlockchainAdmin
        const fee = new Transaction(req.body.from, req.body.private, "046dde2f0162157620e0b6a2347cb5522148f35809c871bad9cfa3843b4f40f48c4fe043ea8fee6b3e07234a044138afcfc240a0854e5eeb2d587686dc4a239bcb", parseInt(req.body.amount / 100), "Transaction Fee");
        fee.signTransaction(txKey);

        // Check is the transaction is valid.
        const trans = tx.isValid();

        if (trans === true) {
            //Add the transaction to the temporary Block.
            // Most of the Unknown Errors would be the result of the user tempering with the data.
            const lastCheck = blockchain.addTransaction(tx);
            const testfee = blockchain.addTransaction(fee);
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

/**
 * 
 * Check if the chain has been compromised.
 * 
 */
router.get('/valid', async (req, res) => {

    if (blockchain.isChainValid()) {
        res.status(200).json({ message: "Sucess" });
    } else {
        res.status(400).json({ message: "Blockhain Compromised!" });
    }

});



/**
 * 
 * Returns the total number of coins in circulation
 * 
 */
router.get('/totalCoins', async (req, res) => {
    res.status(200).json(blockchain.getNumberOfCoins());
});

/**
 * 
 * Returns the USD value of a coin
 * The value is determined by the total Market Cap
 * 
 */
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

/**
 * 
 * Log Stripe transaction in the DB
 * 
 */
router.post('/addTransaction', async (req, res) => {
    const trans = {
        public_key: req.session.publicKey,
        date: Date.now(),
        amount: req.body.amount
    };
    Transactions.create(trans, (err, result) => {
        if (err) {
            res.status(400).json({ message: "MongoDB error" });
        } else {
            console.log(result);
            res.status(200).json({ message: "Sucess" });
        }
    });

});

/**
 * 
 * Return a day by day data about the coin since its creation
 * 
 */
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
    setTimeout(() => res.status(200).json(result.sort((a, b) => (a.date > b.date ? 1 : -1))), 500)
});


/**
 * 
 * Coin mining route
 * 
 */
router.get('/mine', async (req, res) => {

    // node-worker-threads-pool npm 
    // https://www.npmjs.com/package/node-worker-threads-pool
    const pool = new StaticPool({
        size: 10,
        task: filePath,
        // workerData: "workerData!",
    });

    // Gets the result from the thread.
    const result = await thread(pool, req.session.publicKey);
    switch (result) {
        case 1:
            res.status(401).json("Block Invalid");
            break;
        case 2:
            res.status(200).json("sucess");
            break;
        default:
            res.status(401).json("This block has already been mined");
    }
    console.log("result " + result);

});


/**
 * 
 * Mining function
 * 
 */
const thread = async (pool, publicKey) => {


    const nodeLengths = [];
    //Picks a random node & Will use the same thread worker id.
    const nodeNumber = Math.floor(Math.random() * 9);

    // Store the length of all the nodes
    nodes.map((node) => nodeLengths.push(node.numberOfBlocks));
    nodeLengths[nodeNumber]++;

    // Check if somebody is already mining this transaction
    // by comparing the length of each node & counting how many times the longest node shows up.
    const maxLength = Math.max(...nodeLengths);
    var count = nodeLengths.filter(function (nodeLength) {
        return nodeLength == maxLength;
    })
    console.log("count: " + count.length)
    console.log("Node number:" + nodeNumber);
    console.log("Nodelengths: " + nodeLengths);
    console.log("Max length: " + maxLength);
    console.log("\nThis Node length" + nodeLengths[nodeNumber]);

    // do not try to mine the transaction because consensus hash is paused.
    // WIP
    if (count.length === 1) {
        nodes[nodeNumber].minePendingTransactions(publicKey)
    }

    // if(!nodes[nodeNumber].isChainValid()) return res.status(401).json("Block Invalid");
    // Check if the node has been tempered with
    if (!nodes[nodeNumber].isChainValid()) {
        //Block Invalid
        return 1;

    } else {

        // Execute the hash function (Concensus is being pause right now.). Random number guessing function right now.
        const res = await pool.exec(nodeNumber);

        // if you are the first to mine this block. Clone your instance in the Blockchain & the other nodes.
        if (nodes[nodeNumber].numberOfBlocks >= maxLength && count.length === 1) {
            blockchain = Object.assign(Object.create(Object.getPrototypeOf(nodes[nodeNumber])), nodes[nodeNumber]);
            for (let i = 0; i < 9; i++) {
                nodes[i] = Object.assign(Object.create(Object.getPrototypeOf(nodes[nodeNumber])), nodes[nodeNumber]);
            }
            // Store the data in the Json file(For seeding & server reboot purposes.)
            const jsonChain = JSON.stringify(blockchain.chain)
            fs.writeFile('./blockchain/chain.json', jsonChain, err => {
                if (err) {
                    console.log('Error writing file', err)
                } else {
                    // Await is not waiting for this Callback for some reason ? 
                    return 2;
                    // this.res.status(200).json("sucess");
                }
                
            })
            //Success 
            return 2;
        } else {
            // console.log("This Block has already been mined");
            return 3;
        }
    }
}

module.exports = router;