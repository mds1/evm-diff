import { Opcode } from '@/types';

export const number: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x43,
  name: 'number',
  description: 'Get the L1 block number',
  references: [
    {
      name: 'Differences between Arbitrum and Ethereum',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
