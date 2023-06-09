import { ethers } from 'ethers';
import BridgeBsc from '../artifacts/contracts/BridgeBsc.sol/BridgeBsc.json'
import BridgeEth from '../artifacts/contracts/BridgeEth.sol/BridgeEth.json'
import dotenv from 'dotenv';
dotenv.config();

// Set private key for EthBridge Admin
const EthBridgeAdminPrivateKey = process.env.ETH_PRIVATE_KEY;

// Set Providers
const EthProvider = new ethers.JsonRpcProvider("https://sepolia.infura.io/v3/" + process.env.INFURA_API_KEY);
const BscProvider = new ethers.JsonRpcProvider("https://data-seed-prebsc-1-s1.binance.org:8545");

// Set Contract Addresses
const EthBridgeAddress = "0xc25c364456a5Bbb9a9fc7D12623A11Fb52CA4027";
const BscBridgeAddress = "0xaA090c176DBcA6D8b46246fB21950D6E1f53351A";

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
    });
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
    console.error(error);
    process.exitCode = 1;
});