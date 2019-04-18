const BigchainDB = require('bigchaindb-driver')
const API_PATH = 'https://test.bigchaindb.com/api/v1/'
const conn = new BigchainDB.Connection(API_PATH)

const bip39 = require('bip39')
const seed = bip39.mnemonicToSeed('now supply affair wreck lunch scheme tiny mirror destroy inquiry torch wife double teach trust what fatal butter cool slice miss demise sunny better memory trip garbage own unusual slow decade brave').slice(0,32)
const alice = new BigchainDB.Ed25519Keypair(seed)


// TOKENIZE ARTWORK


/*
IMPORTANT

in this contract need to add the buyback functionality

*/

let tokenization = {
    productId:'',
    name: '',
    owner: '',
    tokenqty: '',
}
/*let metaTokenization = {

}*/

const nTokens = 10000
let tokensLeft
const tokenCreator = new BigchainDB.Ed25519Keypair(bip39.mnemonicToSeed('now supply affair wreck lunch scheme tiny mirror destroy inquiry torch wife double teach trust what fatal butter cool slice miss demise sunny better memory trip garbage own unusual slow decade brave').slice(0,32))
let createTxId

const initTokanization = (_productId, _name, _owner, _tokenqty/*, _value_eur, _value_btc*/) => {   
    tokenization.productId = _productId;
    tokenization.name = _name;
    tokenization.owner = _owner;
    tokenization.tokenqty = _tokenqty;
    //metaTokenization.value_eur = _value_eur;
    //metaTokenization.value_btc = _value_btc;
    tokenLaunch();
  }

function tokenLaunch() {
    const tx = BigchainDB.Transaction.makeCreateTransaction({
            token: '',
            number_tokens: nTokens
        },
        // Metadata field, contains information about the transaction itself (can be `null` if not needed)
        {
            datetime: new Date().toString()
        },
        // Output: Divisible asset, include nTokens as parameter
        [BigchainDB.Transaction.makeOutput(BigchainDB.Transaction
          .makeEd25519Condition(tokenCreator.publicKey), nTokens.toString())],
        tokenCreator.publicKey
    )

    const txSigned = BigchainDB.Transaction
      .signTransaction(tx, tokenCreator.privateKey)

    conn.postTransactionCommit(txSigned)
        .then(res => {
            createTxId = res.id
            tokensLeft = nTokens
            document.body.innerHTML ='<h3>Transaction created</h3>';
            // txSigned.id corresponds to the asset id of the tokens
            document.body.innerHTML +=txSigned.id
        })
}

const amountToSend = 200

const newUser = new BigchainDB
    .Ed25519Keypair(bip39.mnemonicToSeed('now supply affair wreck lunch scheme tiny mirror destroy inquiry torch wife double teach trust what fatal butter cool slice miss demise sunny better memory trip garbage own unusual slow decade brave')
        .slice(0, 32))

function transferTokens() {
    const newUser = new BigchainDB.Ed25519Keypair()

    // Search outputs of the transactions belonging the token creator
    // False argument to retrieve unspent outputs
    conn.getTransaction(createTxId)
        .then((txOutputs) => {
            // Create transfer transaction
            const createTranfer = BigchainDB.Transaction
                .makeTransferTransaction(
                    [{
                        tx: txOutputs,
                        output_index: 0
                    }],
                    // Transaction output: Two outputs, because the whole input must be spent
                    [BigchainDB.Transaction.makeOutput(
                            BigchainDB.Transaction
                            .makeEd25519Condition(tokenCreator.publicKey),
                            (tokensLeft - amountToSend).toString()),
                        BigchainDB.Transaction.makeOutput(
                            BigchainDB.Transaction
                            .makeEd25519Condition(newUser.publicKey),
                            amountToSend)
                    ],
                    // Metadata (optional)
                    {
                        transfer_to: 'john',
                        tokens_left: tokensLeft
                    }
                )

            // Sign the transaction with the tokenCreator key
            const signedTransfer = BigchainDB.Transaction
                .signTransaction(createTranfer, tokenCreator.privateKey)

            return conn.postTransactionCommit(signedTransfer)
        })
        .then(res => {
            // Update tokensLeft
            tokensLeft -= amountToSend
            document.body.innerHTML += '<h3>Transfer transaction created</h3>'
            document.body.innerHTML += res.id
        })

}


export { initTokanization }