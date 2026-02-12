#!/bin/bash
set -euo pipefail

# Ensure deterministic glob ordering across environments
export LC_ALL=C

# First we get list of all chains.
CHAIN_DIR="./script/data/chain"
OUTPUT_FILE="./src/lib/chains.json"
CHAINS=()

for file in "$CHAIN_DIR"/*.json; do
  if [ -e "$file" ]; then
    CHAIN_ID=$(basename "$file" .json)
    CHAIN_NAME=$(jq -r '.metadata.name' "$file")
    CHAINS+=("{ \"chainId\": $CHAIN_ID, \"name\": \"$CHAIN_NAME\" }")
  fi
done

cat > "$OUTPUT_FILE" <<EOL
[
  $(IFS=,; echo "${CHAINS[*]}")
]
EOL

echo "✅ Successfully updated chains.json file"

# Then we get list of all features.
FEATURE_DIR="./script/data/feature"
OUTPUT_FILE="./src/lib/features.json"
FEATURES=()

for file in "$FEATURE_DIR"/*.json; do
  if [ -e "$file" ]; then
    FEATURE=$(basename "$file" .json)
    FEATURES+=("{ \"feature\": \"$FEATURE\" }")
  fi
done

cat > "$OUTPUT_FILE" <<EOL
[
  $(IFS=,; echo "${FEATURES[*]}")
]
EOL

bun fmt
echo "✅ Successfully updated features.json file"

# Copy data to public/ so Next.js can serve it locally in dev mode.
rm -rf ./public/data
cp -r ./script/data ./public/data
echo "✅ Copied data to public/data for local dev"