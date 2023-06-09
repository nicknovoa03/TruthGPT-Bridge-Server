import { ethers } from 'ethers';
import BridgeEth from '../artifacts/contracts/BridgeEth.sol/BridgeEth.json'
import dotenv from 'dotenv';
dotenv.config();

// Set private key for EthBridge Admin
const EthBridgeAdminPrivateKey = process.env.ETH_PRIVATE_KEY;

// Set Providers
const EthProvider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY);

// Set Contract Addresses
const EthBridgeAddress = "0xc25c364456a5Bbb9a9fc7D12623A11Fb52CA4027";

// Get the signer's address
const signerEth = new ethers.Wallet(EthBridgeAdminPrivateKey!, EthProvider);

// Load Bridge Contracts
const bridgeEth = new ethers.Contract(EthBridgeAddress, BridgeEth.abi, signerEth);



async function main() {

    console.log("Initializing");

    const tx = await bridgeEth.tokenTransfer(to, amount, nonce);

    console.log(`Transaction hash: ${tx.hash}`);

}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.

const to = "0xAf6C5fF92c0a3F187b063500D47dd1DBf034dC45"
const amount = ethers.parseEther('1')
const nonce = 1001

main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});