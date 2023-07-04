import { Opcode } from '@/types';

export const number: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x43,
  name: 'number',
  description: 'Return L2 block number',
  references: [
    {
      name: 'differences between Optimism and Ethereum',
      url: 'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
    },
  ],
};
