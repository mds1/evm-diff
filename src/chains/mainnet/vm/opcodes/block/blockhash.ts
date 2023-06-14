import { Opcode } from '@/chains/types';

export const blockhash: Opcode = {
  number: 0x40,
  name: 'blockhash',
  description: 'Get the hash of one of the 256 most recent complete blocks',
  minGas: 20,
  inputs: [
    {
      name: 'blockNumber',
      description:
        'The block number to get the hash from. Valid range is the last 256 blocks (not including the current one). Current block number can be queried with NUMBER.',
    },
  ],
  outputs: [
    {
      name: 'hash',
      description:
        'The hash of the chosen block, or 0 if the block number is not in the valid range',
    },
  ],
  examples: [
    {
      input: '599423545',
      output: '0x29045A592007D0C246EF02C2223570DA9522D0CF0F73282C79A1BC8F0BB2C238',
    },
  ],
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: 'https://www.evm.codes/#40?fork=shanghai',
    },
    {
      name: 'execution-specs',
      url: 'https://github.com/ethereum/execution-specs/blob/master/src/ethereum/shanghai/vm/instructions/block.py#L22',
    },
  ],
};
