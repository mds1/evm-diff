import { difficulty as baseOpcode } from '@/chains/mainnet/vm/opcodes/block/difficulty';
import { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, ...opcode } = baseOpcode;
export const difficulty: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  description: 'Returns the constant `1`.',
  references: [
    {
      name: 'Differences between Arbitrum and Ethereum opcodes',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
