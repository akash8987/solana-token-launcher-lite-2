const { Connection, clusterApiUrl } = require('@solana/web3.js');

// Configuration for the Solana Connection and Wallet
// Replace 'YOUR_PRIVATE_KEY_BASE58' with your actual key for production
module.exports = {
  RPC_URL: clusterApiUrl('devnet'),
  PRIVATE_KEY: 'YOUR_PRIVATE_KEY_BASE58', 
  TOKEN_DECIMALS: 9
};
