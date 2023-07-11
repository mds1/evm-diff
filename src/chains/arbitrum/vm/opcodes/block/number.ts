import { number as numberMainnet } from '@/chains/mainnet/vm/opcodes/block/number';
import { Opcode } from '@/types';

export const number: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  ...numberMainnet,
  description:
    'Return an estimate of the L1 block number at which the Sequencer received the transaction.',
  references: [
    ...numberMainnet.references,
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
