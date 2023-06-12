import { Opcode } from '@/types/opcode';

export const number: Opcode = {
  number: 43,
  name: 'number',
  description: 'L2 block number',
  minGas: 2,
  inputs: [],
  outputs: [
    {
      name: 'blockNumber',
      description: 'The current L2 block number',
    },
  ],
  examples: [
    {
      input: [],
      output: '1636704767',
    },
  ],
  errorCases: ['Not enough gas.', 'Stack overflow.'],
  notes: [],
  references: [
    {
      name: 'evm.codes',
      url: 'https://www.evm.codes/#43?fork=shanghai',
    },
    {
      name: 'differences between Ethereum and Arbitrum block numbers',
      url: 'https://developer.arbitrum.io/time#arbitrum-block-numbers',
    },
    {
      name: 'execution-specs',
      url: 'https://github.com/ethereum/execution-specs/blob/master/src/ethereum/shanghai/vm/instructions/block.py#L126',
    },
  ],
};
