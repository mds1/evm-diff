import { coinbase as coinbaseMainnet } from '@/chains/mainnet/vm/opcodes/block/coinbase';
import { Opcode } from '@/types';

// TODO: It's not clear if this opcode is a no-op or if it will revert.
export const coinbase: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  ...coinbaseMainnet,
  description: 'The opcode is not defined.',
  references: [
    ...coinbaseMainnet.references,
    {
      name: 'Differences between Optimism and Ethereum opcodes',
      url: 'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
    },
  ],
};
