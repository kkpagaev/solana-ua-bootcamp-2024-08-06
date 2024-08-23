import "dotenv/config";
import {
  Connection,
  clusterApiUrl,
  PublicKey,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const publicKey = new PublicKey(process.env["KEY"] ?? "");

void (async () => {
  const balance = await connection.getBalance(publicKey);
  console.log(balance / LAMPORTS_PER_SOL);
})();
