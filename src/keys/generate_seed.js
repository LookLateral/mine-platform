import lightwallet from "eth-lightwallet";
import Web3 from "web3";
import HookedWeb3Provider from "hooked-web3-provider";

function generateSeed() {
  var new_seed = lightwallet.keystore.generateRandomSeed();

  document.getElementById("seed").value = new_seed;

  generateAddresses(new_seed);
}

var totalAddresses = 0;

function generateAddresses(seed) {
  if (seed === undefined) {
    seed = document.getElementById("seed").value;
  }

  if (!lightwallet.keystore.isSeedValid(seed)) {
    document.getElementById("info").innerHTML = "Please enter a valid seed";
    return;
  }

  totalAddresses = prompt("How many addresses do you want to generate");

  if (!Number.isInteger(parseInt(totalAddresses))) {
    document.getElementById("info").innerHTML =
      "Please enter valid number of addresses";
    return;
  }

  var password = Math.random().toString();

  console.log('seed: \n' + JSON.stringify(seed))
  console.log('password: \n' + JSON.stringify(password))

  lightwallet.keystore.createVault(
    {
      password: password,
      seedPhrase: seed
    },
    function(err, ks) {
      console.log('ks: \n' + JSON.stringify(ks))
      ks.keyFromPassword(password, function(err, pwDerivedKey) {
        if (err) {
          document.getElementById("info").innerHTML = err;
        } else {
          ks.generateNewAddress(pwDerivedKey, totalAddresses);
          var addresses = ks.getAddresses();

          var web3 = new Web3(
            //new Web3.providers.HttpProvider("http://localhost:8545")
            new Web3.providers.HttpProvider("http://ropsten.infura.io/v3/84cee8bfacb4478ca9e367c267cde99e")
          );

          var html = "";

          for (var count = 0; count < addresses.length; count++) {
            var address = addresses[count];
            var private_key = ks.exportPrivateKey(address, pwDerivedKey);
            var balance = web3.eth.getBalance("0x" + address);

            html = html + "<li>";
            html = html + "<p><b>Address: </b>0x" + address + "</p>";
            html = html + "<p><b>Private Key: </b>0x" + private_key + "</p>";
            html =
              html +
              "<p><b>Balance: </b>" +
              web3.fromWei(balance, "ether") +
              " ether</p>";
            html = html + "</li>";
          }

          document.getElementById("list").innerHTML = html;
        }
      });
    }
  );
}

function sendEther() {
  var seed = document.getElementById("seed").value;

  if (!lightwallet.keystore.isSeedValid(seed)) {
    document.getElementById("info").innerHTML = "Please enter a valid seed";
    return;
  }

  var password = Math.random().toString();

  lightwallet.keystore.createVault(
    {
      password: password,
      seedPhrase: seed
    },
    function(err, ks) {
      ks.keyFromPassword(password, function(err, pwDerivedKey) {
        if (err) {
          document.getElementById("info").innerHTML = err;
        } else {
          ks.generateNewAddress(pwDerivedKey, totalAddresses);

          ks.passwordProvider = function(callback) {
            callback(null, password);
          };

          var provider = new HookedWeb3Provider({
            host: "http://localhost:8545",
            transaction_signer: ks
          });

          var web3 = new Web3(provider);

          var from = document.getElementById("address1").value;
          var to = document.getElementById("address2").value;
          var value = web3.toWei(
            document.getElementById("ether").value,
            "ether"
          );

          web3.eth.sendTransaction(
            {
              from: from,
              to: to,
              value: value,
              gas: 21000
            },
            function(error, result) {
              if (error) {
                document.getElementById("info").innerHTML = error;
              } else {
                document.getElementById("info").innerHTML =
                  "Txn hash: " + result;
              }
            }
          );
        }
      });
    }
  );
}

//module.exports = { generateSeed, generateAddresses, sendEther };
export { generateSeed, generateAddresses, sendEther }
