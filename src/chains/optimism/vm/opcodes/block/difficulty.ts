import { Opcode } from '@/types';

export const difficulty: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> =
  {
    number: 0x44,
    name: 'difficulty',
    description:
      'Return a random value. As this value is set by the sequencer, it is not as reliably random as the L1 equivalent. You can use an oracle for randomness.',
    references: [
      {
        name: 'Differences between Optimism and Ethereum opcodes',
        url: 'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
      },
    ],
  };
