import { Hardforks, getHardforksFrom } from '@/lib/hardforks';
import { OpcodeGroups, ethSpecsOpcodeSrc, evmCodesLink } from '@/lib/opcodes';
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
      url: evmCodesLink('43'),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(OpcodeGroups.Block, 126),
    },
  ],
  supportedHardforks: getHardforksFrom(Hardforks.Frontier),
};
