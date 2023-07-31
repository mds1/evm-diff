import { number as baseOpcode } from '@/chains/mainnet/vm/opcodes/block/number';
import { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, ...opcode } = baseOpcode;
export const number: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  description:
    'Returns an estimate of the L1 block number at which the Sequencer received the transaction.',
  outputs: [
    {
      name: 'blockNumber',
      description:
        'Estimate of the L1 block number at which the Sequencer received the transaction.',
    },
  ],
  references: [
    {
      name: 'Differences between Arbitrum and Ethereum',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
    {
      name: 'Arbitrum Block Numbers and Time',
      url: 'https://developer.arbitrum.io/time',
    },
  ],
};
