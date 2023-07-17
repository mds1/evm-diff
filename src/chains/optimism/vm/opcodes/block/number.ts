import { number as baseOpcode } from '@/chains/mainnet/vm/opcodes/block/number';
import { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, ...opcode } = baseOpcode;
export const number: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  references: [
    {
      name: 'Differences between Optimism and Ethereum',
      url: 'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
    },
  ],
};
