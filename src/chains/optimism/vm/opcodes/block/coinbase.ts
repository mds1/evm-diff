import { Opcode } from '@/types';

// TODO: It's not clear if this opcode is a no-op or if it will revert.
export const coinbase: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x41,
  name: 'coinbase',
  description: 'The opcode is not defined on Optimism',
  references: [
    {
      name: 'differences between Optimism and Ethereum opcodes',
      url: 'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
    },
  ],
};
