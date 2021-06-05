const crypto = require('crypto');
const EC = require('elliptic').ec;
const ec = new EC('secp256k1');
var fs = require('fs');

class Transaction {
  constructor(fromAddress, privateKey, toAddress, amount, label) {
    this.fromAddress = fromAddress;
    this.privateKey = privateKey || null;
    this.toAddress = toAddress;
    this.amount = amount;
    this.label = label || "None";
    this.timestamp = Date.now();
    this.error = "";
  }

  /**
   * Creates a SHA256 hash of the transaction
   */
  calculateHash() {
    return crypto.createHash('sha256').update(this.fromAddress + this.toAddress + this.amount + this.timestamp, this.label).digest('hex');
  }

  /**
   * Signs a transaction with the given signingKey (which is an Elliptic keypair
   * object that contains a private key). The signature is then stored inside the
   * transaction object and later stored on the blockchain.
   */
  signTransaction(signingKey) {
    // You can only send a transaction from the wallet that is linked to your
    // key. So here we check if the fromAddress matches your publicKey
    if (signingKey.getPublic('hex') !== this.fromAddress) {
      return this.error = "Public & Private key not Matching.";
    }


    // Calculate the hash of this transaction then sign it with the key
    const hashTx = this.calculateHash();

    const sig = signingKey.sign(hashTx, 'base64');
    
    this.signature = sig.toDER('hex');
  }

  /**
   * Checks if the signature is valid (transaction has not been tampered with).
   * It uses the fromAddress as the public key.
   */
  isValid() {
    // If the transaction doesn't have a from address we assume it's a
    // mining reward and that it's valid. You could verify this in a
    // different way (special field for instance)
    if (this.fromAddress === null) return true;

    if (!this.signature || this.signature.length === 0) {
      return { error: this.error || "No Signature" };
    }

    const publicKey = ec.keyFromPublic(this.fromAddress, 'hex');
    return publicKey.verify(this.calculateHash(), this.signature);
  }
}

class Block {
  constructor(timestamp, transactions, previousHash = '', nonce = 0) {
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.transactions = transactions;
    this.nonce = nonce;
    this.hash = this.calculateHash();
  }

  /**
   * Returns the SHA256 of this block (by processing all the data stored inside this block)
   */
  calculateHash() {
    return crypto.createHash('sha256').update(this.previousHash + this.timestamp + JSON.stringify(this.transactions) + this.nonce).digest('hex');
  }

  /**
   * Starts the mining process on the block. It changes the 'nonce' until the hash
   * of the block starts with enough zeros (= difficulty)
   */
  mineBlock(difficulty) {
    
     // console.log(this.hash.substring(0, difficulty));
      this.nonce++;
      this.hash = this.calculateHash();
    

  }

  /**
   * Validates all the transactions inside this block (signature + hash) and
   * returns true if everything checks out. False if the block is invalid.
   *
   */
  hasValidTransactions() {
    for (const tx of this.transactions) {
      if (tx.isValid().error) {
        return false;
      }
    }

    return true;
  }
}

class Blockchain {
  constructor() {
    this.pendingTransactions = [];
    this.chain = [this.createGenesisBlock()];
    this.difficulty = 5;
    this.miningReward = 100;
    this.numberOfBlocks = 0;
  }

  /**
   * Populate the Blockchain from JSON.
   * Temporary fix since Heroku stops the server after a while and does not allow to use differents ports to create nodes.
   * Recreate each Block & Transaction from the data (Hence why we need to temporary store the PrivateKeys.)
   * Looking into serialization solution but I have not found anything that would be able to serialize nested objects yet.
   */
  populate() {
    //Get the Data from the JSON file
    fs.readFile('./blockchain/chain.json', 'utf8', (err, chainString) => {
      if (err) {
        console.log("Error reading file from disk:", err)
        return
      }
      try {
        const populateChain = JSON.parse(chainString);
        //Iterate through each Block
        for (let JSONblock of populateChain) {
          // Iterate through each transaction
          for (let transaction of JSONblock.transactions) {
            
            //Create a new transaction & Sign it.
            const trans = new Transaction(transaction.fromAddress, transaction.privateKey, transaction.toAddress, transaction.amount);
            if (transaction.fromAddress) {
              const transKey = ec.keyFromPrivate(transaction.privateKey);
              trans.signTransaction(transKey);
            }
            // If the transaction is valid, push it into the pending block.
            if (trans.isValid()) {
              this.pendingTransactions.push(trans);
            }
          }

          //Push the block onto the Blockchain.
          const block = new Block(JSONblock.timestamp, this.pendingTransactions, this.getLatestBlock().hash, this.getLatestBlock().nonce);
          block.mineBlock(0);
          this.chain.push(block);
          this.numberOfBlocks++;
          this.pendingTransactions = [];
        }
        
      } catch (err) {
        console.log('Error Reading the block file', err)
        return
      }
    })
  }

  // Creates the first Block
  createGenesisBlock() {
    return new Block(Date.parse('2021-05-26'), [], '0');
  }

  /**
   * Returns the latest block on our chain. Useful when you want to create a
   * new Block and you need the hash of the previous Block.
   */
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  /**
   * Takes all the pending transactions, puts them in a Block and starts the
   * mining process. It also adds a transaction to send the mining reward to
   * the given address.
   */
  minePendingTransactions(miningRewardAddress, difficulty) {
    const rewardTx = new Transaction(null, null, miningRewardAddress, this.miningReward, "Mining Reward");
    this.pendingTransactions.push(rewardTx);

    const block = new Block(Date.now(), this.pendingTransactions, this.getLatestBlock().hash, this.getLatestBlock().nonce);
    if (difficulty !== 0) { difficulty = this.difficulty; }
    block.mineBlock(difficulty);
    this.chain.push(block);
    this.numberOfBlocks++;

    this.pendingTransactions = [];
  }

  /**
   * Add a new transaction to the list of pending transactions (to be added
   * next time the mining process starts). This verifies that the given
   * transaction is properly signed.
   */
  addTransaction(transaction) {
    transaction.amount = parseInt(transaction.amount);
    if (!transaction.fromAddress || !transaction.toAddress) {

      return { error: 'Transaction must include from and to address' };
    }

    // Verify the transactiion
    if (transaction.isValid().error) {
      return { error: "Cannot add invalid transaction to chain" };
    }

    if (transaction.amount <= 0) {
      return { error: 'Transaction amount should be higher than 0' };
    }

    // Making sure that the amount sent is not greater than existing balance
    if (this.getBalanceOfAddress(transaction.fromAddress) < transaction.amount) {
      return { error: 'Not enough balance' };
    }

    this.pendingTransactions.push(transaction);
    return { sucess: "Sucess" };
  }

  /**
   * Returns the balance of a given wallet address.
   */
  getBalanceOfAddress(address) {
    let balance = 0;

    for (const block of this.chain) {
      for (const trans of block.transactions) {
        if (trans.fromAddress === address) {
          balance -= trans.amount;
        }

        if (trans.toAddress === address) {
          balance += trans.amount;
        }
      }
    }

    return balance;
  }

  //Returns the number of coins in circulation at a specific date.
  getDatedCoins(time) {
    let numberOfCoins = 120000;
    for (const block of this.chain) {
      if (block.timestamp > time) break;

      numberOfCoins += 100;
    }
    return numberOfCoins;
  }

  // Returns total number of coins on the Chain
  getNumberOfCoins() {
    let numberOfCoins = 120000 + (this.numberOfBlocks) * 100;
    return numberOfCoins;
  }

  /**
   * Returns a list of all transactions that happened
   * to and from the given wallet address.
   */
  getAllTransactionsForWallet(address) {
    const txs = [];

    for (const block of this.chain) {
      for (const tx of block.transactions) {
        if (tx.fromAddress === address || tx.toAddress === address) {
          txs.push(tx);
        }
      }
    }

    return txs;
  }

  /**
   * Loops over all the blocks in the chain and verify if they are properly
   * linked together and nobody has tampered with the hashes. By checking
   * the blocks it also verifies the (signed) transactions inside of them.
   *
   */
  isChainValid() {
    // Check if the Genesis block hasn't been tampered with by comparing
    // the output of createGenesisBlock with the first block on our chain
    const realGenesis = JSON.stringify(this.createGenesisBlock());


    if (realGenesis !== JSON.stringify(this.chain[0])) {
      return false;
    }

    // Check the remaining blocks on the chain to see if there hashes and
    // signatures are correct
    for (let i = 1; i < this.chain.length; i++) {
      //console.log(this.chain[i]);
      const currentBlock = this.chain[i];

      if (!currentBlock.hasValidTransactions()) {
        return false;
      }

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }
    }

    return true;
  }
}

module.exports.Blockchain = Blockchain;
module.exports.Block = Block;
module.exports.Transaction = Transaction;
