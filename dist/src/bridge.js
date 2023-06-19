"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const BridgeBsc_json_1 = __importDefault(require("../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json"));
const BridgeEth_json_1 = __importDefault(require("../artifacts/contracts/BridgeEth.sol/BridgeEth.json"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Set private key for EthBridge Admin
const EthBridgeAdminPrivateKey = process.env.ETH_TEST_PRIVATE_KEY;
// Set Providers
let EthProvider = new ethers_1.ethers.JsonRpcProvider("https://infura.io/v3/" + process.env.INFURA_API_KEY);
let BscProvider = new ethers_1.ethers.JsonRpcProvider("https://bsc-dataseed.binance.org/");
// Set Providers
let EthTestProvider = new ethers_1.ethers.JsonRpcProvider("https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY);
let BscTestProvider = new ethers_1.ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
EthProvider = EthTestProvider;
BscProvider = BscTestProvider;
// Set Contract Addresses
let EthBridgeAddress = "0xc14F24cf3768a0997E39aE11F288Ea421485EF54";
let BscBridgeAddress = "0x9Af4010CCAFAd067ff8b961eC94371fc805823b5";
// Set Test Contract Addresses
let EthTestBridgeAddress = "0x0aaFfD6fb69cfc591e775c6A4D10Ab43b32bEBd1";
;
let BscTestBridgeAddress = "0xE12D1a1Abbc5f3a9FF0CdEeD2Bb238d86D6620A5";
//EthBridgeAddress = EthTestBridgeAddress;
//BscBridgeAddress = BscTestBridgeAddress;
// Get the signer's address
const signerEth = new ethers_1.ethers.Wallet(EthBridgeAdminPrivateKey, EthProvider);
// Load Bridge Contracts
const bridgeEth = new ethers_1.ethers.Contract(EthBridgeAddress, BridgeEth_json_1.default.abi, signerEth);
const bridgeBsc = new ethers_1.ethers.Contract(BscBridgeAddress, BridgeBsc_json_1.default.abi, BscProvider);
async function main() {
    try {
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
    catch (error) {
        console.error(error);
        // Restart the main function
        main().catch((error) => {
            console.error(error);
            process.exitCode = 1;
        });
    }
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
