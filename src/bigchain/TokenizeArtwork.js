const BigchainDB = require('bigchaindb-driver')
const API_PATH = 'https://test.bigchaindb.com/api/v1/'
const conn = new BigchainDB.Connection(API_PATH)

//const bip39 = require('bip39')
//const seed = bip39.mnemonicToSeed('now supply affair wreck lunch scheme tiny mirror destroy inquiry torch wife double teach trust what fatal butter cool slice miss demise sunny better memory trip garbage own unusual slow decade brave').slice(0,32)
//const alice = new BigchainDB.Ed25519Keypair(seed)


// TOKENIZE ARTWORK

/* ZUNOTE - IMPORTANT in this contract need to add the buyback functionality and consider how much they want to sell/keep!! */

let tokenDetails = {
    tokenizationId: null,
    artworkId: null,
    ownerId: null,
    tokenqty: null,
    tokenToKeep: null, 
    tokenLeft: null,
    tokenName: null,
    tokenSuggestedValue: null, // needed?
    tokenValue: null,
    buyback: null,
    //name: null,
    //artist: null,
    //year: null,
    //location: null,    
}


//const tokenCreator = new BigchainDB.Ed25519Keypair(bip39.mnemonicToSeed('now supply affair wreck lunch scheme tiny mirror destroy inquiry torch wife double teach trust what fatal butter cool slice miss demise sunny better memory trip garbage own unusual slow decade brave').slice(0,32))
// ZUNOTE: need to pass user keys, here creating a random one each time
const tokenCreator = new BigchainDB.Ed25519Keypair()
let createTxId

const initTokanization = (_tokenDetails/*, _tokenMetadata*/) => {   
    tokenDetails.artworkId = _tokenDetails.artworkId
    tokenDetails.owner = _tokenDetails.owner
    tokenDetails.tokenqty = _tokenDetails.tokenqty
    //tokenDetails.tokenLeft = _tokenDetails.tokenqty                     after txn success
    tokenDetails.tokenToKeep = _tokenDetails.tokenKept
    tokenDetails.name = _tokenDetails.name
    tokenDetails.tokenSuggestedValue = _tokenDetails.tokenSuggestedValue
    tokenDetails.tokenValue = _tokenDetails.tokenValue
    tokenDetails.buyback = _tokenDetails.buyback
    
    // _tokenMetadata ??
    
    return tokenLaunch();
  }

function tokenLaunch() {      
    const tx = BigchainDB.Transaction.makeCreateTransaction(
        {
            tokenDetails,
            //token: '',
            //number_tokens: nTokens
        },
        {
            datetime: new Date().toString(),
            /*value: {
                image: tokenMetadata.image,
                location: tokenMetadata.location,
                value_usd: tokenMetadata.value_usd,
                value_btc: tokenMetadata.value_btc,
            }*/
        },
        [BigchainDB.Transaction.makeOutput(BigchainDB.Transaction
          .makeEd25519Condition(tokenCreator.publicKey), tokenDetails.tokenqty.toString())],
        tokenCreator.publicKey
    )

    const txSigned = BigchainDB.Transaction
      .signTransaction(tx, tokenCreator.privateKey)

    conn.postTransactionCommit(txSigned)
        .then(res => {
            createTxId = res.id
            tokenDetails.tokenLeft = tokenDetails.tokenqty
            tokenDetails.tokenizationId = txSigned.id 

            //document.body.innerHTML ='<h3>Transaction created</h3>';
            //document.body.innerHTML +=txSigned.id
        })
        console.log("response tokenLaunch:\n" + JSON.stringify(txSigned));
        return txSigned.id
}



////////////////////////////// need to fix all, i'm building previous stuff, step by step

let txnId
let receiver = {
    userId: null,
    artworkId: null,
    tokenizationId: null,
    fractId: null,
    amountToSend: null,
  }

//const newUser = new BigchainDB.Ed25519Keypair(bip39.mnemonicToSeed('now supply affair wreck lunch scheme tiny mirror destroy inquiry torch wife double teach trust what fatal butter cool slice miss demise sunny better memory trip garbage own unusual slow decade brave').slice(0, 32))
// ZUNOTE: need to pass newUser keys, here creating a random one each time
const newUser = new BigchainDB.Ed25519Keypair()

const initTransferTokens = (_receiver) => {   
    receiver.userId = _receiver.userId
    receiver.fractId = _receiver.fractId
    receiver.amountToSend = _receiver.amountToSend
    
    return transferTokens();
  }

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
                            (tokenDetails.tokensLeft - receiver.amountToSend).toString()),
                        BigchainDB.Transaction.makeOutput(
                            BigchainDB.Transaction
                            .makeEd25519Condition(newUser.publicKey),
                            receiver.amountToSend)
                    ],
                    // Metadata (optional)
                    {
                        transfer_to: receiver.userId,
                        tokens_left: tokenDetails.tokenLeft
                    }
                )

            // Sign the transaction with the tokenCreator key
            const signedTransfer = BigchainDB.Transaction
                .signTransaction(createTranfer, tokenCreator.privateKey)

            return conn.postTransactionCommit(signedTransfer)
        })
        .then(res => {
            tokenDetails.tokenLeft -= receiver.amountToSend
            //document.body.innerHTML += '<h3>Transfer transaction created</h3>'
            //document.body.innerHTML += res.id
            //return res.id
            txnId = res.id
            console.log("response transferTokens:\n" + JSON.stringify(res));
        })
        
    return txnId
}

export { initTokanization, initTransferTokens }