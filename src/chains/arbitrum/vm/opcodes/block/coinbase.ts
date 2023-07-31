import { coinbase as baseOpcode } from '@/chains/mainnet/vm/opcodes/block/coinbase';
import { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, ...opcode } = baseOpcode;
export const coinbase: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  description:
    'Returns `0xA4b000000000000000000073657175656e636572`, the address of the L1 Batch Poster.',
  outputs: [
    {
      name: 'address',
      description: "The L1 Batch Poster's address",
    },
  ],
  examples: [
    {
      output: '0xA4b000000000000000000073657175656e636572',
    },
  ],
  references: [
    {
      name: 'Differences between Arbitrum and Ethereum opcodes',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
