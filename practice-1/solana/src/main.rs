extern crate dotenv;

use dotenv::dotenv;
use solana_sdk::signer::Signer;
mod generate_keys;
mod check_balance;
mod load_keys;

fn main() {
    dotenv().ok();
    let generated_key = generate_keys::gen_keys();
    println!("{}", generated_key);
    let loaded_key = load_keys::load();
    println!("{}", loaded_key.to_base58_string());
    check_balance::check(&loaded_key.pubkey());
}
