import { difficulty as baseOpcode } from '@/chains/mainnet/vm/opcodes/block/difficulty';
import { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, ...opcode } = baseOpcode;
export const difficulty: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  description:
    'Returns a random value. As this value is set by the sequencer, it is not as reliably random as the L1 equivalent. You can use an oracle for randomness.',
  references: [
    {
      name: 'Differences between Optimism and Ethereum opcodes',
      url: 'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
    },
  ],
};
