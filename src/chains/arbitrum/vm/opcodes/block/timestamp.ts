import { timestamp as baseOpcode } from '@/chains/mainnet/vm/opcodes/block/timestamp';
import { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, ...opcode } = baseOpcode;
export const timestamp: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  description: 'Returns the timestamp of the L2 block.',
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
