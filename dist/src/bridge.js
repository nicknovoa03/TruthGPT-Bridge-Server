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
const EthBridgeAdminPrivateKey = process.env.ETH_PRIVATE_KEY;
// Set Providers
const EthProvider = new ethers_1.ethers.JsonRpcProvider("https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY);
const BscProvider = new ethers_1.ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");
// Set Contract Addresses
const EthBridgeAddress = "0xc25c364456a5Bbb9a9fc7D12623A11Fb52CA4027";
const BscBridgeAddress = "0xaA090c176DBcA6D8b46246fB21950D6E1f53351A";
// Get the signer's address
const signerEth = new ethers_1.ethers.Wallet(EthBridgeAdminPrivateKey, EthProvider);
// Load Bridge Contracts
const bridgeEth = new ethers_1.ethers.Contract(EthBridgeAddress, BridgeEth_json_1.default.abi, signerEth);
const bridgeBsc = new ethers_1.ethers.Contract(BscBridgeAddress, BridgeBsc_json_1.default.abi, BscProvider);
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
    });
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
