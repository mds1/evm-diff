import { Method, MethodNamespace } from '@/types';

const clientVersion: Method = {
  name: 'web3_clientVersion',
  namespace: MethodNamespace.Web3,
  description: 'Returns the current client version',
  return: {
    type: 'string',
    description: 'The current client version',
  },
  example: {
    parameters: [],
    result: 'Geth/v1.12.1-stable/linux-amd64/go1.19.1',
  },
  references: [
    '[ethereum.org](https://ethereum.org/en/developers/docs/apis/json-rpc#web3_clientversion)',
  ],
};

const sha3: Method = {
  name: 'web3_sha3',
  namespace: MethodNamespace.Web3,
  description: 'Returns Keccak-256 (not the standardized SHA3-256) of the given data',
  parameters: [
    {
      type: 'data',
      description: 'The data to convert into a SHA3 hash',
    },
  ],
  return: {
    type: 'data',
    description: 'The SHA3 result of the given string',
  },
  example: {
    parameters: ['0x68656c6c6f20776f726c64'],
    result: '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad',
  },
  references: ['[ethereum.org](https://ethereum.org/en/developers/docs/apis/json-rpc#web3_sha3)'],
};

export const web3Methods: Method[] = [clientVersion, sha3];
