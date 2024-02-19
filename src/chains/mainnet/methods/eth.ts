import { Method, MethodNamespace } from '@/types';

const protocolVersion: Method = {
  name: 'eth_protocolversion',
  namespace: MethodNamespace.Eth,
  description: 'Returns the current Ethereum protocol version',
  return: {
    type: 'string',
    description: 'The current Ethereum protocol version',
  },
  examples: [
    {
      parameters: [],
      result: '54',
    },
  ],
  references: [
    '[ethereum.org](https://ethereum.org/en/developers/docs/apis/json-rpc#eth_protocolversion)',
  ],
};

const syncing: Method = {
  name: 'eth_syncing',
  namespace: MethodNamespace.Eth,
  description: 'Returns an object|boolean with data about the sync status or false',
  return: {
    type: 'object|boolean',
    description: `The precise return data varies between client implementations. All clients return False when the node is not syncing, and all clients return the following fields.

An object with sync status data or FALSE, when not syncing:
- startingBlock: QUANTITY - The block at which the import started (will only be reset, after the sync reached his head).
- currentBlock: QUANTITY - The current block, same as eth_blockNumber.
- highestBlock: QUANTITY - The estimated highest block.

However, the individual clients may also provide additional data.
`,
  },
  examples: [
    {
      description: 'Geth',
      parameters: [],
      result: `{
  "currentBlock": "0x3cf522",
  "healedBytecodeBytes": "0x0",
  "healedBytecodes": "0x0",
  "healedTrienodes": "0x0",
  "healingBytecode": "0x0",
  "healingTrienodes": "0x0",
  "highestBlock": "0x3e0e41",
  "startingBlock": "0x3cbed5",
  "syncedAccountBytes": "0x0",
  "syncedAccounts": "0x0",
  "syncedBytecodeBytes": "0x0",
  "syncedBytecodes": "0x0",
  "syncedStorage": "0x0",
  "syncedStorageBytes": "0x0"
}`,
    },
    {
      description: 'Besu',
      parameters: [],
      result: `{
  "startingBlock": "0x0",
  "currentBlock": "0x1518",
  "highestBlock": "0x9567a3",
  "pulledStates": "0x203ca",
  "knownStates": "0x200636"
}`,
    },
  ],
  references: ['[ethereum.org](https://ethereum.org/en/developers/docs/apis/json-rpc#eth_syncing)'],
};

export const ethMethods: Method[] = [protocolVersion, syncing];
