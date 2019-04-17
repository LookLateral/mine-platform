const BigchainDB = require('bigchaindb-driver')
const API_PATH = 'https://test.bigchaindb.com/api/v1/'
const conn = new BigchainDB.Connection(API_PATH)

//const bip39 = require('bip39')
//const seed = bip39.mnemonicToSeed('now supply affair wreck lunch scheme tiny mirror destroy inquiry torch wife double teach trust')/*.slice(0,32)*/
//const seed = bip39.mnemonicToSeed('seedPhrase').slice(0,32)
//const alice = new BigchainDB.Ed25519Keypair(seed)

// ZUNOTE: creating random keys each time. need to pass keys
const alice = new BigchainDB.Ed25519Keypair()

function writeArtworkToChain(uploadDetails, uploadMetadata) {
    const txCreatePaint = BigchainDB.Transaction.makeCreateTransaction(
        {
            uploadDetails,
        },
        {
            datetime: new Date().toString(),
            value: {
                image: uploadMetadata.image,
                location: uploadMetadata.location,
                size: uploadMetadata.size,
                value_usd: uploadMetadata.value_usd,
                value_btc: uploadMetadata.value_btc,
            }
        },
        [BigchainDB.Transaction.makeOutput(
            BigchainDB.Transaction.makeEd25519Condition(alice.publicKey))],
        alice.publicKey
    )
    const txSigned = BigchainDB.Transaction.signTransaction(txCreatePaint,
        alice.privateKey)

    conn.postTransactionCommit(txSigned)
        /*.then(res => {
            document.body.innerHTML += '<h3>Transaction created</h3>';
            document.body.innerHTML += txSigned.id
            
        })*/
    return txSigned.id
}

/*function transferOwnership(txCreatedID, newOwner) {
    // Get transaction payload by ID
    conn.getTransaction(txCreatedID)
        .then((txCreated) => {
            const createTranfer = BigchainDB.Transaction.
            makeTransferTransaction(
                // The output index 0 is the one that is being spent
                [{
                    tx: txCreated,
                    output_index: 0
                }],
                [BigchainDB.Transaction.makeOutput(
                    BigchainDB.Transaction.makeEd25519Condition(
                        newOwner.publicKey))],
                {
                    datetime: new Date().toString(),
                    value: {
                        value_eur: '30000000€',
                        value_btc: '2100',
                    }
                }
            )
            // Sign with the key of the owner of the painting (Alice)
            const signedTransfer = BigchainDB.Transaction
                .signTransaction(createTranfer, alice.privateKey)
            return conn.postTransactionCommit(signedTransfer)
        })
        .then(res => {
            document.body.innerHTML += '<h3>Transfer Transaction created</h3>'
            document.body.innerHTML += res.id
        })
}*/

export { writeArtworkToChain }