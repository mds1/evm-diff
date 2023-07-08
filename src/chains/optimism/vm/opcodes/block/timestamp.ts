import { Opcode } from '@/types';

export const timestamp: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> =
  {
    number: 0x42,
    name: 'timestamp',
    description: 'Returns the timestamp of the L2 block.',
    references: [
      {
        name: 'Differences between Optimism and Ethereum',
        url: 'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
      },
    ],
  };
