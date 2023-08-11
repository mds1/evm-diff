import { coinbase as baseOpcode } from '@/chains/mainnet/vm/opcodes/block/coinbase';
import { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, ...opcode } = baseOpcode;
export const coinbase: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  description:
    'Returns `0x4200000000000000000000000000000000000011`, the address of the Sequencer Fee Vault.',
  outputs: [
    {
      name: 'address',
      description: 'The address of the Sequencer Fee Vault.',
    },
  ],
  examples: [
    {
      output: '0x4200000000000000000000000000000000000011',
    },
  ],
  references: [
    '[Differences between Ethereum and OP Mainnet: Opcode Differences](https://community.optimism.io/docs/developers/build/differences/#opcode-differences)',
  ],
};
