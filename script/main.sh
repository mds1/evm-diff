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

  # We'll store "pid:chainId" in one array entry.
  declare -a pidsAndChains=()

  for chainId in $chainIds; do
    echo "Launching chain ID $chainId (chain $index of $numChains) in the background."

    # Each chain runs in the background. We prefix logs so we know which chain they belong to.
    {
      echo "START chain $index (ID $chainId)"
      bun script/index.ts "$chainId"
      echo "FINISH chain $index (ID $chainId)"
    } 2>&1 | sed "s/^/[Chain $chainId] /" &

    pid=$!
    pidsAndChains+=("$pid:$chainId")

    index=$((index + 1))
  done

  # Wait for all jobs to complete, tracking failures but not exiting early.
  declare -a failedChains=()  # Will store chainIds that fail.

  for entry in "${pidsAndChains[@]}"; do
    IFS=':' read -r pid chainId <<< "$entry"

    # If wait fails, record the chainId, but don't exit yet.
    if ! wait "$pid"; then
      failedChains+=("$chainId")
      echo "❌ Chain ID $chainId encountered an error (see its logs above)."
    else
      echo "✅ Chain ID $chainId completed successfully."
    fi
  done

  # If any chain failed, exit with an error.
  if [ "${#failedChains[@]}" -gt 0 ]; then
    echo ""
    echo "❌ The following chain(s) encountered errors: ${failedChains[*]}"
    exit 1
  else
    echo ""
    echo "All chains completed successfully."
    exit 0
  fi

else
  # Input provided, run the script with the provided input.
  echo "Running for chain ID $1"
  bun script/index.ts "$1"
fi
