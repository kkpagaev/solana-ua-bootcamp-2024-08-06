import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";
import { Keypair, clusterApiUrl, Connection, PublicKey } from "@solana/web3.js";

const privateKey = process.env["SECRET"];
if (privateKey === undefined) {
  console.log("Add SECRET_KEY to .env!");
  process.exit(1);
}
const asArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(asArray);

const connection = new Connection(clusterApiUrl("devnet"));

console.log(`🔑 Our public key is: ${sender.publicKey.toBase58()}`);

void (async () => {
  const tokenMintAccount = new PublicKey(
    "24BPginZi4WhSuNFAtpvrLe5ZYUZsWKLea77Qg3YF2S8",
  );
  const recipient = Keypair.generate().publicKey;

  const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient,
  );

  console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

  const link = getExplorerLink(
    "address",
    tokenAccount.address.toBase58(),
    "devnet",
  );

  console.log(`✅ Created token account: ${link}`);
})();
