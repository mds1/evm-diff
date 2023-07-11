import { number as numberMainnet } from '@/chains/mainnet/vm/opcodes/block/number';
import { Opcode } from '@/types';

export const number: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  ...numberMainnet,
  description: 'Returns the L2 block number.',
  references: [
    ...numberMainnet.references,
    {
      name: 'Differences between Optimism and Ethereum',
      url: 'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
    },
  ],
};
