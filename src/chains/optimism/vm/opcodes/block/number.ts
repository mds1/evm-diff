import { Opcode } from '@/chains/types';

export const number: Opcode = {
  number: 0x43,
  name: 'number',
  description: "Get the L2 block's number",
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
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    'https://www.evm.codes/#43?fork=shanghai',
    'https://github.com/ethereum/execution-specs/blob/master/src/ethereum/shanghai/vm/instructions/block.py#L126',
    'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
  ],
};
