#!/bin/bash
set -euo pipefail

# Function to handle final preparation steps
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

# Set up a trap to run final preparation steps on script exit
trap final_preparation EXIT


if [ $# -eq 0 ]; then
  # No input provided, find all *.json files in the data/chain folder
  chainFiles=(script/data/chain/*.json)
  numChains=${#chainFiles[@]}
  echo "Found $numChains chains"

  index=1
  for file in "${chainFiles[@]}"; do
    input="${file%.json}" # Extract the file name without the extension
    input="${input##*/}" # Extract the file name without the path
    echo ""
    echo "Running for chain ID $input (chain $index of $numChains)"
    bun script/index.ts "$input"
    index=$((index + 1))
  done
else
  # Input provided, run the script with the provided input
  echo "Running for chain ID $1"
  bun script/index.ts "$1"
fi
