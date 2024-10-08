/* eslint-disable @typescript-eslint/no-floating-promises */
import "dotenv/config";
import {
  Connection,
  LAMPORTS_PER_SOL,
  SystemProgram,
  Keypair,
  Transaction,
  sendAndConfirmTransaction,
  clusterApiUrl,
  PublicKey,
} from "@solana/web3.js";
import { airdropIfRequired } from "@solana-developers/helpers";

const connection = new Connection(clusterApiUrl("devnet"));
// const connection = new Connection("http://127.0.0.1:8899", "confirmed");

const to = new PublicKey("HUNDaRStkWLKbJUsAnvbijX8Gq7jCp7mirZvDuHdLEck");
// const to =

const keypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env["SECRET"] ?? "")),
);

// global await please
async function main() {
  await airdropIfRequired(
    connection,
    keypair.publicKey,
    0.1 * LAMPORTS_PER_SOL,
    0.1 * LAMPORTS_PER_SOL,
  );
  const tr = new Transaction();

  tr.add(
    SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: to,
      lamports: 0.1 * LAMPORTS_PER_SOL,
    }),
  );

  const signature = await sendAndConfirmTransaction(connection, tr, [keypair], {
    commitment: "single",
  });

  console.log({ signature });
  console.log({
    from: keypair.publicKey.toBase58(),
    to: "7QGVZ9rq3sQ4N64rpEijaBH4b6UxScZBiD7Sx6DZJ7LU",
  });
}

main();
