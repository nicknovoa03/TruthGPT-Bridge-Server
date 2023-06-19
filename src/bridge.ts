import { ethers } from 'ethers';
import BridgeBsc from '../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json'
import BridgeEth from '../artifacts/contracts/BridgeEth.sol/BridgeEth.json'
import dotenv from 'dotenv';
dotenv.config();

// Set private key for EthBridge Admin
const EthBridgeAdminPrivateKey = process.env.ETH_TEST_PRIVATE_KEY;

// Set Providers
let EthProvider = new ethers.JsonRpcProvider("https://infura.io/v3/" + process.env.INFURA_API_KEY);
let BscProvider = new ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");

// Set Providers
let EthTestProvider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY);
let BscTestProvider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");

EthProvider = EthTestProvider
BscProvider = BscTestProvider

// Set Contract Addresses
const EthBridgeAddress = "0x0aaFfD6fb69cfc591e775c6A4D10Ab43b32bEBd1";
const BscBridgeAddress = "0xE12D1a1Abbc5f3a9FF0CdEeD2Bb238d86D6620A5";

// Get the signer's address
const signerEth = new ethers.Wallet(EthBridgeAdminPrivateKey!, EthProvider);

// Load Bridge Contracts
const bridgeEth = new ethers.Contract(EthBridgeAddress, BridgeEth.abi, signerEth);

const bridgeBsc = new ethers.Contract(BscBridgeAddress, BridgeBsc.abi, BscProvider);


async function main() {

    console.log("Initializing");
    bridgeBsc.on("Transfer", async (from, to, amount, date, nonce, step) => {
        console.log("Transfer Found!");

        const tx = await bridgeEth.tokenTransfer(to, amount, nonce);

        console.log(`Transaction hash: ${tx.hash}`);
        console.log(`
      Processed transfer:
      - from ${from} 
      - to ${to} 
      - amount ${amount} tokens
      - date ${date}
      - nonce ${nonce}
    `);
        console.log("Searching...");
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});