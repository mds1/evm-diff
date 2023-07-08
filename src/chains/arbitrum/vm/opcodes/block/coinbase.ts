import { Opcode } from '@/types';

export const coinbase: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x41,
  name: 'coinbase',
  description: 'Returns zero.',
  references: [
    {
      name: 'Differences between Arbitrum and Ethereum opcodes',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
