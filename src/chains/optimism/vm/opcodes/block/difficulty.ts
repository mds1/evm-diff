import { difficulty as difficultyMainnet } from '@/chains/mainnet/vm/opcodes/block/difficulty';
import { Opcode } from '@/types';

export const difficulty: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> =
  {
    ...difficultyMainnet,
    description:
      'Returns a random value. As this value is set by the sequencer, it is not as reliably random as the L1 equivalent. You can use an oracle for randomness.',
    references: [
      ...difficultyMainnet.references,
      {
        name: 'Differences between Optimism and Ethereum opcodes',
        url: 'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
      },
    ],
  };
