import { prevrandao as prevrandaoMainnet } from '@/chains/mainnet/vm/opcodes/block/prevrandao';
import { Opcode } from '@/types';

export const prevrandao: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> =
  {
    ...prevrandaoMainnet,
    description: 'Returns the constant 2500000000000000.',
    references: [
      ...prevrandaoMainnet.references,
      {
        name: 'Differences between Arbitrum and Ethereum opcodes',
        url: 'https://developer.arbitrum.io/solidity-support',
      },
    ],
  };
