use std::env;
use solana_sdk::signer::keypair::Keypair;

pub fn load() -> Keypair {
    let f = env::var("SECRET").unwrap();
    let vec: Vec<u8> = serde_json::from_str(&f).expect("Failed to parse string");
    let kp = Keypair::from_bytes(&vec).unwrap();

    return kp;
}
