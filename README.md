# bitcoin-rpc - [npm](https://www.npmjs.com/package/@jskitty/bitcoin-rpc)
A simple, efficient, zero-dep Bitcoin RPC interface.

## Why?
Most other Bitcoin RPC libraries either:
- Have unnecessary dependencies.
- Don't follow proper standards (silent RPC errors, strange Promise handling, etc).
- Have hardcoded RPC commands, meaning the lib must be upgraded every time the RPC daemon changes, seriously?

## How?

```js
const RPCClient = require('@jskitty/bitcoin-rpc');

// Create a new RPC class for a Bitcoind RPC daemon
//                           user    pass    host         port
const btcRPC = new RPCClient('user', 'pass', '127.0.0.1', 8332);

// EXAMPLE: Fetch the latest block count
btcRPC.call('getblockcount').then(nBlocks => {
    console.log('There\'s ' + nBlocks + ' blocks in the blockchain, nice!');
});

// EXAMPLE: Fetch a raw block based on it's block hash
btcRPC.call('getblock', '000000000019d6689c085ae165831e934ff763ae46a2a6c172b3f1b60a8ce26f').then(cBlock => {
    console.log(cBlock);
});

// EXAMPLE: Asynchronously fetch the latest block count
async function getBlockCount() {
    const nBlocks = await btcRPC.call('getblockcount');
    console.log('There\'s ' + nBlocks + ' blocks in the blockchain, nice!');
}
```
