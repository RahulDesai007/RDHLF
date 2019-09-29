/**
 * Demonstrates the use of Gateway Network & Contract classes
 */
'use strict';
 // Needed for reading the connection profile as JS object
const fs = require('fs');
// Used for parsing the connection profile YAML file
const yaml = require('js-yaml');
// Import gateway class
const { Gateway, FileSystemWallet, DefaultEventHandlerStrategies, Transaction  } = require('fabric-network');
var response
var responseBal
// Constants for profile
const CONNECTION_PROFILE_PATH = '/home/rahul/Desktop/HFWorkspace/HLFTemplate/app/sdk/profiles/dev-connection.yaml';
// Path to the wallet
const FILESYSTEM_WALLET_PATH = '/home/rahul/Desktop/HFWorkspace/HLFTemplate/app/sdk/gateway/user-wallet';
// Identity context used
const USER_ID = 'Admin@acme.com'
// Channel name
const NETWORK_NAME = 'airlinechannel'
// Chaincode
//const CONTRACT_ID = "erc20"
const CONTRACT_ID = "template"


 const gateway = new Gateway();

// Sets up the gateway | executes the invoke & query
//main()

/**
 * Executes the functions for query & invoke
 */

async  function  transferData(params) {
    console.log("dataa aaa raha hai", params)
    // 2. Setup the gateway object
    await setupGateway()
    console.log("fafafafafafa")

    // 3. Get the network
    let network = await gateway.getNetwork(NETWORK_NAME)
     console.log(network)

       // 5. Get the contract
    const contract = await network.getContract(CONTRACT_ID);
  //   console.log(contract, "contract")

    // 6. Query the chaincode
  // await queryContract(contract, params)
  //   return ({result:responseBal.toString()})

    // 7. Execute the transaction
    await submitTxnContract(contract, params)
    console.log("idher bhi aara", params)
    return ({result:response.toString()})
    // Must give delay or use await here otherwise Error=MVCC_READ_CONFLICT
    // await submitTxnContract(contract)

   

}

/**
 * Queries the chaincode
 * @param {object} contract 
 */
// async function queryContract(contract, params){

//     var name = params.personName.name
//     try{
//         // Query the chaincode
//         responseBal = await contract.evaluateTransaction('balanceOf', name)
//         console.log(`Query Response=${response.toString()}`)
//         return ({result:responseBal.toString()})

//     } catch(e){
//         console.log(e)
//     }
// }

/**
 * Submit the transaction
 * @param {object} contract
 */


    
async function submitTxnContract(contract, params, res, req, next){
  
 //  console.log("datatatata", contract)

   
       // console.log("contract", contract)
        var transferfrom = params.UserDetails.transferfrom
        console.log(params,"<--------")
         var transferto = params.UserDetails.transferto
        var  value = params.UserDetails.value
        console.log("transferfrom at gateway---->", transferfrom)
        try{
        // Submit the transaction
        
        response = await contract.submitTransaction('transfer', transferfrom, transferto, value)
      
        console.log("Submit Response=",response.toString())
        return ({result:response.toString()})
        
    
       
    } catch(e) {
        // fabric-network.TimeoutError
       console.log(e)
        return err;
        
    }
    next(err)
}


/**
 * Function for setting up the gateway
 * It does not actually connect to any peer/orderer
 */
async function setupGateway() {
    console.log("calling......")
    // 2.1 load the connection profile into a JS object
    const connectionProfile = yaml.safeLoad(fs.readFileSync(CONNECTION_PROFILE_PATH, 'utf8'));
  // console.log("connection profile", connectionProfile)
    // 2.2 Need to setup the user credentials from wallet
    const wallet = new FileSystemWallet(FILESYSTEM_WALLET_PATH)

    // 2.3 Set up the connection options
    let connectionOptions = {
        identity: USER_ID,
        wallet: wallet,
        discovery: { enabled: false, asLocalhost: true }
        /*** Uncomment lines below to disable commit listener on submit ****/
        , eventHandlerOptions: {
            strategy: null
        } 
    }

    // 2.4 Connect gateway to the network
    await gateway.connect(connectionProfile, connectionOptions)
    // console.log( gateway)
}



/**
 * Creates the transaction & uses the submit function
 * Solution to exercise
 * To execute this add the line in main() => submitTxnTransaction(contract)
 * @param {object} contract 
 */
// async function submitTxnTransaction(contract) {
//     // Provide the function name
//     let txn = contract.createTransaction('transfer')
    
//     // Get the name of the transaction
//     console.log(txn.getName())

//     // Get the txn ID
//     console.log(txn.getTransactionID())

//     // Submit the transaction
//     try{
//         let response = await txn.submit('john', 'sam', '2')
//         console.log("transaction.submit()=", response.toString())
//     } catch(e) {
//         console.log(e)
//     }
// }

// }

module.exports = {
   // submitTransaction: submitTransaction,
  //  submitTxnContract: submitTxnContract,
    transferData : transferData,
  //  queryContract: queryContract
};