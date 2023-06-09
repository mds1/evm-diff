import { Opcode } from '@/types';

export const number: Opcode = {
  number: 0x43,
  name: 'number',
  description: 'Get the L1 block number',
  minGas: 2,
  outputs: [{ name: 'blockNumber', description: 'The L1 block number' }],
  examples: [{ output: '1636704767' }],
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    {
      name: 'differences between Arbitrum and Ethereum',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
