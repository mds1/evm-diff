import { Opcode } from '@/types';

export const difficulty: Omit<Opcode, 'minGas' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x44,
  name: 'difficulty',
  description: 'Return the constant 2500000000000000',
  outputs: [
    { name: 'zero', description: 'A constant value of zero', expression: '2500000000000000' },
  ],
  examples: [{ output: '2500000000000000' }],
  references: [
    {
      name: 'Differences between Arbitrum and Ethereum opcodes',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
