# Ethereum Offline Signer

Simple tool to sign an Ethereum offline in an air-gapped computer.

## Installing

```
npm i -g ethereum-offline-signer
```

## Usage

Enter the following command:

```
eth-sign NONCE VALUE FROM_KEY [TO_ADDRESS] [GAS_PRICE] [GAS_LIMIT] [DATA] [CHAIN_ID]
```

With the arguments formatted as follows:

```
- NONCE      : an int (ex: 7)
- VALUE      : a float in ether (ex: 0.01)
- FROM_KEY   : a 256-bit hex (ex: 0x9c22ff5f21f0b81b113e63f7db6da94fedef11b2119b4088b89664fb9a3cb658)*
- TO_ADDRESS : optionally a hex address (ex: 0xC08B5542D177ac6686946920409741463a15dDdB)
- GAS_PRICE  : optionally a float in gwei (ex: 10)
- GAS_LIMIT  : optionally a float in gas (ex: 50000)
- DATA       : optionally a hex (ex: 0x01020304)
- CHAIN_ID   : optionally an in (ex: 1)
```
