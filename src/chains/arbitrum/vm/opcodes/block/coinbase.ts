import { Opcode } from '@/types';

export const coinbase: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x41,
  name: 'coinbase',
  description:
    'The concept of `block.coinbase` is not applicable in the context of optimistic rollups because only the sequencer is responsible for creating and finalizing blocks. The sequencer does not receive any direct mining rewards for its role in block creation so there is no need for a coinbase address.',
  references: [
    {
      name: 'Differences between Arbitrum and Ethereum opcodes',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
