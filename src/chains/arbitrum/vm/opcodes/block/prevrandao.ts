import { Opcode } from '@/types';

export const prevrandao: Omit<Opcode, 'minGas' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x44,
  name: 'prevrandao',
  description: 'Return the constant 2500000000000000',
  outputs: [
    { name: 'zero', description: 'A constant value of zero', expression: '2500000000000000' },
  ],
  examples: [{ output: '2500000000000000' }],
  references: [
    {
      name: 'differences between Arbitrum and Ethereum opcodes',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
