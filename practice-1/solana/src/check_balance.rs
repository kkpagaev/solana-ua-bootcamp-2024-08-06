use solana_sdk::pubkey::Pubkey;
use solana_client::rpc_client::RpcClient;

pub fn check(keys: &Pubkey) {
    // println!("balance: {}", balance);
    let rpc_url = String::from("https://api.devnet.solana.com");
    let client = RpcClient::new(rpc_url);

    match client.get_balance(keys) {
        Ok(balance) => println!("{}", balance as f64 / solana_sdk::native_token::LAMPORTS_PER_SOL as f64),
        Err(e) => eprintln!("Error getting balance: {}", e),
    }
}
