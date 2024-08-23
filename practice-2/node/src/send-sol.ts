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
  TransactionInstruction,
  PublicKey,
} from "@solana/web3.js";

const connection = new Connection(clusterApiUrl("devnet"));
const to = Keypair.generate().publicKey;
const keypair = Keypair.fromSecretKey(
  Uint8Array.from(JSON.parse(process.env["SECRET"] ?? "")),
);
async function main() {
  // await airdropIfRequired(
  //   connection,
  //   keypair.publicKey,
  //   0.1 * LAMPORTS_PER_SOL,
  //   0.1 * LAMPORTS_PER_SOL,
  // );
  const tr = new Transaction();

  tr.add(
    SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: to,
      lamports: 0.001 * LAMPORTS_PER_SOL,
    }),
  );

  const memoProgram = new PublicKey(
    "MemoSq4gqABAXKb96qnH8TysNcWxMyWCqXgDLGmfcHr",
  );

  const memoText = "jesse we need to go to the kfc";

  const addMemoInstruction = new TransactionInstruction({
    keys: [{ pubkey: keypair.publicKey, isSigner: true, isWritable: true }],
    data: Buffer.from(memoText, "utf-8"),
    programId: memoProgram,
  });

  tr.add(addMemoInstruction);

  console.log(`📝 memo is: ${memoText}`);
  const signature = await sendAndConfirmTransaction(connection, tr, [keypair], {
    commitment: "confirmed",
  });

  console.log({ signature });
  console.log({
    from: keypair.publicKey.toBase58(),
    to: to,
  });
}

main();
