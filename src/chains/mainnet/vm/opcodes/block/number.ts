import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroups, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
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
      url: evmCodesOpcodesLink(0x43),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(OpcodeGroups.Block, 126),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
