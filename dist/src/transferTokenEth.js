"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ethers_1 = require("ethers");
const BridgeEth_json_1 = __importDefault(require("../artifacts/contracts/BridgeEth.sol/BridgeEth.json"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
// Set private key for EthBridge Admin
const EthBridgeAdminPrivateKey = process.env.ETH_PRIVATE_KEY;
// Set Providers
const EthProvider = new ethers_1.ethers.JsonRpcProvider("https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY);
// Set Contract Addresses
const EthBridgeAddress = "0xc25c364456a5Bbb9a9fc7D12623A11Fb52CA4027";
// Get the signer's address
const signerEth = new ethers_1.ethers.Wallet(EthBridgeAdminPrivateKey, EthProvider);
// Load Bridge Contracts
const bridgeEth = new ethers_1.ethers.Contract(EthBridgeAddress, BridgeEth_json_1.default.abi, signerEth);
async function main() {
    console.log("Initializing");
    const tx = await bridgeEth.tokenTransfer(to, amount, nonce);
    console.log(`Transaction hash: ${tx.hash}`);
}
// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
const to = "0xAf6C5fF92c0a3F187b063500D47dd1DBf034dC45";
const amount = ethers_1.ethers.parseEther('1');
const nonce = 1001;
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});
