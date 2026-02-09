const { 
  Connection, 
  Keypair, 
  LAMPORTS_PER_SOL 
} = require('@solana/web3.js');
const { 
  createMint, 
  getOrCreateAssociatedTokenAccount, 
  mintTo 
} = require('@solana/spl-token');
const bs58 = require('bs58');
const config = require('./config');

async function main() {
  // 1. Setup Connection & Signer
  const connection = new Connection(config.RPC_URL, 'confirmed');
  const payer = Keypair.fromSecretKey(bs58.decode(config.PRIVATE_KEY));
  
  console.log(`Starting deployment from: ${payer.publicKey.toBase58()}`);

  // 2. Create New Token Mint
  console.log('Creating mint...');
  const mint = await createMint(
    connection,
    payer,
    payer.publicKey,
    payer.publicKey,
    config.TOKEN_DECIMALS
  );
  console.log(`Token Mint Created: ${mint.toBase58()}`);

  // 3. Create Associated Token Account for Payer
  console.log('Creating Associated Token Account...');
  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    payer,
    mint,
    payer.publicKey
  );
  console.log(`ATA Created: ${tokenAccount.address.toBase58()}`);

  // 4. Minting initial supply (e.g., 1000 tokens)
  const amount = 1000 * Math.pow(10, config.TOKEN_DECIMALS);
  await mintTo(
    connection,
    payer,
    mint,
    tokenAccount.address,
    payer,
    amount
  );

  console.log(`Successfully minted 1000 tokens to ${tokenAccount.address.toBase58()}`);
}

main().catch(err => {
  console.error('Deployment failed:', err);
});
