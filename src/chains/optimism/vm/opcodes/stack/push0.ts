import { Opcode } from '@/types';

export const push0: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x5f,
  name: 'push0',
  description: 'Opcode not supported yet (will be added in a hardfork)',
  references: [
    {
      name: 'differences between Optimism and Ethereum opcodes',
      url: 'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
    },
  ],
};
