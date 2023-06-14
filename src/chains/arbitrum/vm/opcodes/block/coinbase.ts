import { Opcode } from '@/chains/types';

export const coinbase: Omit<Opcode, 'playgroundLink'> = {
  number: 0x41,
  name: 'coinbase',
  description:
    'The concept of `block.coinbase` is not applicable in the context of optimistic rollups because only the sequencer is responsible for creating and finalizing blocks. The sequencer does not receive any direct mining rewards for its role in block creation so there is no need for a coinbase address.',
  minGas: 0, // TODO: Couldn't find this value
  outputs: [
    { name: 'zero', description: 'A constant value of zero', expression: '2500000000000000' },
  ],
  examples: [{ output: '2500000000000000' }],
  errorCases: [],
  references: [
    {
      name: 'differences between Arbitrum and Ethereum opcodes',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
