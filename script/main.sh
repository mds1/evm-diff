#!/bin/bash

set -euo pipefail

fetchDataForChainId() {
  bun lint # Lint for potential issues.
  bun script/index.ts "$1" # Fetch data for the given chain ID.
  bun script/postprocess.ts # Slice data by feature.
  bun fmt # Format the generated files.
}

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
    fetchDataForChainId "$input"
    index=$((index + 1))
  done
else
  # Input provided, run the script with the provided input
  echo "Running for chain ID $1"
  fetchDataForChainId "$1" "1" "1"
fi