import { Opcode } from '@/chains/types';

export const number: Opcode = {
  number: 43,
  name: 'number',
  description: "Get the block's number",
  minGas: 2,
  inputs: [],
  outputs: [
    {
      name: 'blockNumber',
      description: 'The current block number',
    },
  ],
  examples: [
    {
      input: [],
      output: '1636704767',
    },
  ],
  errorCases: ['Not enough gas', 'Stack overflow'],
  notes: [],
  references: [
    'https://www.evm.codes/#43?fork=shanghai',
    'https://github.com/ethereum/execution-specs/blob/master/src/ethereum/shanghai/vm/instructions/block.py#L126',
  ],
};
