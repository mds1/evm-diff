import { OpcodeWithoutPlaygroundLink } from '@/chains/types';

export const coinbase: OpcodeWithoutPlaygroundLink = {
  number: 0x41,
  name: 'coinbase',
  description:
    'The concept of `block.coinbase` is not applicable in the context of Optimistic rollups because only the sequencer is responsible for creating and finalizing blocks. The sequencer does not receive any direct mining rewards for its role in block creation so there is no need for a coinbase address.',
  minGas: 0, // TODO: Couldn't find this value
  outputs: [
    {
      name: 'constant',
      description:
        'A constant value of since there is no specific address associated with the block reward on Arbitrum',
      expression: '2500000000000000',
    },
  ],
  examples: [
    {
      output: '2500000000000000',
    },
  ],
  errorCases: ['TODO'],
  references: ['https://developer.arbitrum.io/solidity-support'],
};
