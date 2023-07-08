import { Opcode } from '@/types';

export const prevrandao: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> =
  {
    number: 0x44,
    name: 'prevrandao',
    description: 'Returns the constant 2500000000000000.',
    references: [
      {
        name: 'Differences between Arbitrum and Ethereum opcodes',
        url: 'https://developer.arbitrum.io/solidity-support',
      },
    ],
  };
