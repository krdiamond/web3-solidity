import Web3 from 'web3';
import Sale from './Sale.json'

const web3 = new Web3(Web3.givenProvider || "ws://127.0.0.1:7545");

const contractAddress = "0x1F4d7cd9F91c1026D912fC11cE900E8Aadde2e53"
const contract = new web3.eth.Contract(Sale.abi, contractAddress)

const sharedMessage = "This is to confirm your account when downloading the limited edition album"

export { web3, contract, contractAddress, sharedMessage }