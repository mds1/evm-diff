import { coinbase as baseOpcode } from '@/chains/mainnet/vm/opcodes/block/coinbase';
import { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, ...opcode } = baseOpcode;
export const coinbase: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  description:
    'Returns `0x4200000000000000000000000000000000000011`, the address of the Sequencer Fee Vault.',
  references: [
    {
      name: 'Differences between Optimism and Ethereum opcodes',
      url: 'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
    },
  ],
};
