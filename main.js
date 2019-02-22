#!/usr/bin/env node

const sha3        = require("js-sha3");
const wallet      = require("ethereumjs-wallet");
const Transaction = require("ethereumjs-tx");
const units       = require("ethereumjs-units");
const BN          = require("bn.js");
const even        = hex => hex.length % 2 === 1 ? "0" + hex : hex;
const dec         = dec => "0x" + even(new BN(dec, 10).toString("hex"));
const gwei        = gwei => dec(units.convert(gwei, "gwei", "wei"));
const eth         = eth => dec(units.convert(eth, "eth", "wei"));
const key         = key => key.slice(0,2) === "0x" ? key : "0x" + sha3.keccak256(key);

// Displays usage info
if (!process.argv[2] || !process.argv[3] || !process.argv[4]) {
  console.log("Signs an Ethereum transaction offline. Usage:");
  console.log("$ eth-sign NONCE VALUE FROM_KEY [TO_ADDRESS] [GAS_PRICE] [GAS_LIMIT] [DATA] [CHAIN_ID]");
  console.log("- NONCE      : an int (ex: 7)");
  console.log("- VALUE      : a float in ether (ex: 0.01)");
  console.log("- FROM_KEY   : a 256-bit hex (ex: 0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658)*");
  console.log("- TO_ADDRESS : optionally a hex address (ex: 0xC08B5542D177ac6686946920409741463a15dDdB)");
  console.log("- GAS_PRICE  : optionally a float in gwei (ex: 10)");
  console.log("- GAS_LIMIT  : optionally a float in gas (ex: 50000)");
  console.log("- DATA       : optionally a hex (ex: 0x01020304)");
  console.log("- CHAIN_ID   : optionally an in (ex: 1)");
  console.log("* FROM_KEY can also be a passphrase. Its Keccak256 will be taken as the key.");
  process.exit();
}

// Sets transaction params
const nonce    = process.argv[2] || 0;
const value    = process.argv[3] || 0.001;
const fromKey  = key(process.argv[4] || "test");
const fromAddr = "0x" + wallet.fromPrivateKey(Buffer.from(fromKey.slice(2),"hex")).getAddress().toString("hex");
const to       = process.argv[5] || fromAddr;
const gasPrice = process.argv[6] || 10;
const gasLimit = process.argv[7] || 50000;
const data     = process.argv[8] || "0x";
const chainId  = process.argv[9] || 1;

// Display transaction params
console.log("Signing transaction.");
console.log("nonce    : " + nonce);
console.log("value    : " + value + " eth");
console.log("fromKey  : " + fromKey);
console.log("fromAddr : " + fromAddr);
console.log("to       : " + to);
console.log("gasPrice : " + gasPrice + " gwei (" + units.convert(gasPrice, "gwei", "eth") + " eth)");
console.log("gasLimit : " + gasLimit + " gas (max " + units.convert(gasPrice * gasLimit, "gwei", "eth") + " eth)");
console.log("data     : " + data);
console.log("chainId  : " + chainId);

// Signs and display
const tx = new Transaction({
  nonce    : dec(nonce),
  value    : eth(value),
  to       : to,
  gasPrice : gwei(gasPrice),
  gasLimit : dec(gasLimit),
  data     : data,
  chainId  : chainId});
tx.sign(Buffer.from(fromKey.slice(2),"hex"));
const serializedTx = tx.serialize();
console.log("Signed. Result (serialized):");
console.log("0x"+serializedTx.toString("hex"));
