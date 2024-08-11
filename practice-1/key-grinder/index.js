import { Keypair } from "@solana/web3.js";

function* generateKeyPairs() {
  while (true) {
    yield Keypair.generate();
  }
}

function genVlad() {
  for (const keypair of generateKeyPairs()) {
    if (keypair.publicKey.toString().slice(0, 4).toLowerCase() == "vlad") {
      return keypair;
    }
  }
}
console.log(genVlad().publicKey.toString());
