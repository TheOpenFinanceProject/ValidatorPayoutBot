const ethers = require("ethers")

function getWallet(){
  let SUPER_DUPER_MASTER_KEY_OF_A_NEW_WALLET_YOUR_ARE_NOT_GONNA_USE_AND_NAME_ACCORDINGLY_IN_METAMASK = "0x";
  const provider =  new ethers.providers.JsonRpcProvider("https://rpc.s0.t.hmny.io", {chainId: 1666600000, name: "Harmony"})
  let wallet = new ethers.Wallet(SUPER_DUPER_MASTER_KEY_OF_A_NEW_WALLET_YOUR_ARE_NOT_GONNA_USE_AND_NAME_ACCORDINGLY_IN_METAMASK, provider);
  return wallet
}

async function main(){

  var signer = getWallet();
  const provider =  new ethers.providers.JsonRpcProvider("https://rpc.s0.t.hmny.io", {chainId: 1666600000, name: "Harmony"})

  const abi =  [
     {
      "inputs": [],
      "name": "lastDelegateCount",
      "outputs": [
        {
          "internalType": "uint256",
          "name": "",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "uint256",
          "name": "_numberOfTxs",
          "type": "uint256"
        }
      ],
      "name": "payout",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    }
  ]

  const contract = new ethers.Contract('0x28c1d1565C1526a0c6C261D5297bEb3EE6dBed57', abi, signer);


   let lastCount= await contract.lastDelegateCount().catch((err) => {
    console.log(err)
      })
   var i = 0
   var numberOfTX = 30

   while (i < lastCount){
      console.log("Distributing...")
       await contract.payout(numberOfTX).catch(() => {
        console.log("Fuck That one Failed.")
          })
       await setTimeout(()=> {}, 4000)
      i += lastCount;

   }
}

main();
