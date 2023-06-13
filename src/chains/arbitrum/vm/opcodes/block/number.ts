import { Opcode } from '@/chains/types';

export const number: Opcode = {
  number: 43,
  name: 'number',
  description: 'L2 block number',
  minGas: 2,
  outputs: [
    {
      name: 'blockNumber',
      description: 'The current L2 block number',
    },
  ],
  examples: [
    {
      output: '1636704767',
    },
  ],
  errorCases: ['Not enough gas.', 'Stack overflow.'],
  references: [
    'https://www.evm.codes/#43?fork=shanghai',
    'https://github.com/ethereum/execution-specs/blob/master/src/ethereum/shanghai/vm/instructions/block.py#L126',
    'https://developer.arbitrum.io/time#arbitrum-block-numbers',
  ],
};
