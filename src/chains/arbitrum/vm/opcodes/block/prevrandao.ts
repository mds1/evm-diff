import { prevrandao as baseOpcode } from '@/chains/mainnet/vm/opcodes/block/prevrandao';
import { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, notes: _notes, ...opcode } = baseOpcode;
export const prevrandao: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  outputs: [{ name: 'constant', description: 'The constant `1`.' }],
  examples: [{ output: '1' }],
  description: 'Returns the constant `1`.',
  references: [
    {
      name: 'Differences between Arbitrum and Ethereum opcodes',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
