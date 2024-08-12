import { Keypair } from "@solana/web3.js";
import "dotenv/config";

const keypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env["SECRET"] ?? "")),
);

console.log(`Keypair: ${keypair.secretKey}`);
