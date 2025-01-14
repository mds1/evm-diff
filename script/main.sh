#!/bin/bash
set -euo pipefail

# Load API keys from the repo root.
repoRoot=$(git rev-parse --show-toplevel)
# shellcheck disable=SC1091
source "$repoRoot"/.env

# Function to handle final preparation steps.
final_preparation() {
    local exitStatus=$?

    echo ""
    bun script/postprocess.ts # Slice data by feature.
    bun check # Runs prepare-chain-data, lints, and formats.
    echo ""
    if [ $exitStatus -eq 0 ]; then
      echo "✅ Chain data fetched and processed successfully!"
    else
      echo "❌ An error occurred during chain data fetching or processing. See above for details."
    fi
}

# Set up a trap to run final preparation steps on script exit.
trap final_preparation EXIT


if [ $# -eq 0 ]; then
  # No input provided, read from `input.json`.
  chainIds=$(jq -r '.[].chainId' script/input.json)
  numChains=$(echo "$chainIds" | wc -l | xargs)
  echo "Found $numChains chains"

  index=1
  for chainId in $chainIds; do
    echo ""
    echo "Running for chain ID $chainId (chain $index of $numChains)"
    bun script/index.ts "$chainId"
    index=$((index + 1))
  done
else
  # Input provided, run the script with the provided input.
  echo "Running for chain ID $1"
  bun script/index.ts "$1"
fi
