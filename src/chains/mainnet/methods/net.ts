import { Method, MethodNamespace } from '@/types';

const version: Method = {
  name: 'net_version',
  namespace: MethodNamespace.Net,
  description: 'Returns the current network id',
  return: {
    type: 'string',
    description: 'The current network id',
  },
  examples: [
    {
      parameters: [],
      result: '3',
    },
  ],
  references: [
    '[ethereum.org](https://ethereum.org/en/developers/docs/apis/json-rpc#net_version)',
    '[Full list of curent network IDs](https://chainlist.org/)',
  ],
};

const listening: Method = {
  name: 'net_listening',
  namespace: MethodNamespace.Net,
  description: 'Returns true if client is actively listening for network connections',
  return: {
    type: 'boolean',
    description: 'Return true when listening, otherwise false',
  },
  examples: [
    {
      parameters: [],
      result: 'true',
    },
  ],
  references: [
    '[ethereum.org](https://ethereum.org/en/developers/docs/apis/json-rpc#net_listening)',
  ],
};

const peerCount: Method = {
  name: 'net_peercount',
  namespace: MethodNamespace.Net,
  description: 'Returns number of peers currently connected to the client',
  return: {
    type: 'quantity',
    description: 'Integer of the number of connected peers',
  },
  examples: [
    {
      parameters: [],
      result: '0x2',
    },
  ],
  references: [
    '[ethereum.org](https://ethereum.org/en/developers/docs/apis/json-rpc#net_peercount)',
  ],
};

export const netMethods: Method[] = [version, listening, peerCount];
