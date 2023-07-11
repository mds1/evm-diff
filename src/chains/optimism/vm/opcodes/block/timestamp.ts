import { timestamp as timestampMainnet } from '@/chains/mainnet/vm/opcodes/block/timestamp';
import { Opcode } from '@/types';

export const timestamp: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> =
  {
    ...timestampMainnet,
    description: 'Returns the timestamp of the L2 block.',
    references: [
      ...timestampMainnet.references,
      {
        name: 'Differences between Optimism and Ethereum',
        url: 'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
      },
    ],
  };
