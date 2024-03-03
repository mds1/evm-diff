import { coinbase as baseOpcode } from '@/chains/mainnet/vm/opcodes/block/coinbase';
import { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, ...opcode } = baseOpcode;
export const coinbase: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  description:
    "Returns the designated internal address `0xA4b000000000000000000073657175656e636572` if the message was posted by a sequencer. If it's a delayed message, it returns the address of the delayed message's poster.",
  outputs: [
    {
      name: 'address',
      description:
        "The L1 Batch Poster's address if the message was posted by a sequencer, or the address of the delayed message's poster if it's a delayed message.",
    },
  ],
  examples: [
    {
      output: '0xA4b000000000000000000073657175656e636572',
    },
  ],
  references: [
    '[Arbitrum Differences from Solidity on Ethereum](https://docs.arbitrum.io/for-devs/concepts/differences-between-arbitrum-ethereum/solidity-support)',
  ],
};
