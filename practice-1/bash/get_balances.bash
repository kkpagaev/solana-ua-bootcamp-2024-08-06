#!/bin/bash
pub=$1

if [ -z "$pub" ]; then
  echo "Usage: $0 pubkey"
  exit 1
fi

# echo "pubkey: $pub"
solana transaction-history $pub --output json | jq -r '.[].signature' | \
  xargs -I {} solana confirm --output json -v {} \
  | jq -r '.transaction.message.accountKeys[1]' \
  | xargs -I {} bash -c "echo \"{} - \$(solana balance {} | tr -d '\n')\""

