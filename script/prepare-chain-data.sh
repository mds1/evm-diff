#!/bin/bash
set -euo pipefail

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

bun fmt
echo "✅ Successfully updated chains.json file"