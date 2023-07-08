import { Opcode } from '@/types';

export const number: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x43,
  name: 'number',
  description:
    'Return an estimate of the L1 block number at which the Sequencer received the transaction.',
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
