import { Opcode } from '@/chains/types';

export const number: Opcode = {
  number: 0x43,
  name: 'number',
  description: 'Get the L1 block number',
  minGas: 2,
  outputs: [
    {
      name: 'blockNumber',
      description: 'The L1 block number',
    },
  ],
  examples: [
    {
      output: '1636704767',
    },
  ],
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    'https://www.evm.codes/#43?fork=shanghai',
    'https://github.com/ethereum/execution-specs/blob/master/src/ethereum/shanghai/vm/instructions/block.py#L126',
  ],
};
