const SHA256 = require('crypto-js/sha256');

class Block {
    constructor(timestamp, data, previousHash = '') {
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return SHA256(this.previousHash + this.timestamp + JSON.stringify(this.data)).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block('01/01/2024', 'Genesis block', '0');
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    isChainValid() {
        for (let i = 1; i < this.chain.length; i++) {
            const currentBlock = this.chain[i];
            const previousBlock = this.chain[i - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }

            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }
        }
        return true;
    }
}

let medicalRecordsBlockchain = new Blockchain();
medicalRecordsBlockchain.addBlock(new Block('02/05/2024', { patientName: 'John Doe', diagnosis: 'Flu', medication: 'Antibiotics' }));
medicalRecordsBlockchain.addBlock(new Block('05/05/2024', { patientName: 'Jane Smith', diagnosis: 'Broken arm', medication: 'Painkillers' }));

console.log('Blockchain is valid:', medicalRecordsBlockchain.isChainValid());
console.log(JSON.stringify(medicalRecordsBlockchain, null, 4));
