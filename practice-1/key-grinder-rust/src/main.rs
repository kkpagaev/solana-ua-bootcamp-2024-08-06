use solana_sdk::signer::keypair::Keypair;
use std::{thread};

fn main() {
    let foo: Vec<_> = (0..10).map(|_| {
        thread::spawn(move || {
            loop {
                let key = Keypair::new();
                if key.to_base58_string().starts_with("VLAD") {
                    println!("{}", key.to_base58_string());
                }
            }
        })
    }).collect();
    for t in foo {
        t.join().unwrap();
    }
}
