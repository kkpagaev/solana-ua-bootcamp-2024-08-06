use solana_sdk::signer::keypair::Keypair;

pub fn gen_keys() -> String {
    Keypair::new().to_base58_string()
}
