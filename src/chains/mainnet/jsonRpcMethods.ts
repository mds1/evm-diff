import { Method, MethodNamespace, MethodVariableType as Type } from '@/types';

// web3 namespace.
const web3ClientVersion: Method = {
  name: 'web3_clientVersion',
  namespace: MethodNamespace.Web3,
  description: 'Returns the current client version',
  return: {
    type: Type.String,
    description: 'The current client version',
  },
  example: {
    parameters: [],
    result: 'Geth/v1.12.1-stable/linux-amd64/go1.19.1',
  },
};

const web3Sha3: Method = {
  name: 'web3_sha3',
  namespace: MethodNamespace.Web3,
  description: 'Returns Keccak-256 (not the standardized SHA3-256) of the given data',
  parameters: [
    {
      type: Type.Data,
      description: 'The data to convert into a SHA3 hash',
    },
  ],
  return: {
    type: Type.Data,
    description: 'The SHA3 result of the given string',
  },
  example: {
    parameters: ['0x68656c6c6f20776f726c64'],
    result: '0x47173285a8d7341e5e972fc677286384f802f8ef42a5ec5f03bbfa254cb01fad',
  },
};

const web3Methods: Method[] = [web3ClientVersion, web3Sha3];

// TODO: net namespace.
const netMethods: Method[] = [];

// TODO: eth namespace.
const ethMethods: Method[] = [];

export const jsonRPCMethods: Method[] = [...web3Methods, ...netMethods, ...ethMethods];
