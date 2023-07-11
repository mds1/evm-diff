import { difficulty as difficultyMainnet } from '@/chains/mainnet/vm/opcodes/block/difficulty';
import { Opcode } from '@/types';

export const difficulty: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> =
  {
    ...difficultyMainnet,
    description: 'Returns the constant 2500000000000000.',
    references: [
      ...difficultyMainnet.references,
      {
        name: 'Differences between Arbitrum and Ethereum opcodes',
        url: 'https://developer.arbitrum.io/solidity-support',
      },
    ],
  };
