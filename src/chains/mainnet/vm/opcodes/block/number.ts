import { ETH_SPECS_COMMIT_ID } from '@/lib/constants';
import { Hardforks, getHardforksFrom } from '@/lib/hardforks';
import { Opcode } from '@/types';

export const number: Opcode = {
  number: 0x43,
  name: 'number',
  description: "Get the block's number",
  minGas: 2,
  outputs: [{ name: 'blockNumber', description: 'The current block number' }],
  examples: [{ output: '1636704767' }],
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    {
      name: 'evm.codes',
      url: 'https://www.evm.codes/#43?fork=shanghai',
    },
    {
      name: 'execution-specs',
      url: `https://github.com/ethereum/execution-specs/blob/${ETH_SPECS_COMMIT_ID}/src/ethereum/shanghai/vm/instructions/block.py#L126`,
    },
  ],
  supportedHardforks: getHardforksFrom(Hardforks.Frontier),
};
