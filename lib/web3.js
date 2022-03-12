import Web3 from 'web3';
import Sale from './Sale.json'

const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:7545");

const contractAddress = "0xfBf26B789BDc9d54d5BE70c1fB7Ddf62f129e89e"
const contract = new web3.eth.Contract(Sale.abi, contractAddress)

const signDownloadMessage = "This is to confirm your account made the purchase and you are allowed to download the file. Clicking download would hypothetically download the file to your desktop."

export { web3, contract, contractAddress, signDownloadMessage }