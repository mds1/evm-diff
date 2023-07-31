for i in {1..100}; do
  cast call 0xca11bde05977b3631167028862be2a173976ca11 "aggregate((address,bytes)[])(uint256, bytes[])" "[(0xca11bde05977b3631167028862be2a173976ca11,0x72425d9d)]" --rpc-url $MAINNET_RPC_URL
  cast call 0xca11bde05977b3631167028862be2a173976ca11 "aggregate((address,bytes)[])(uint256, bytes[])" "[(0xca11bde05977b3631167028862be2a173976ca11,0x72425d9d)]" --rpc-url $OPTIMISM_RPC_URL
  echo "---"
done