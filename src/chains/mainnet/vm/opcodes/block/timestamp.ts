import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroups, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const timestamp: Opcode = {
  number: 0x42,
  name: 'timestamp',
  description: "Get the block's timestamp",
  minGas: 2,
  outputs: [
    {
      name: 'timestamp',
      description: 'unix timestamp of the current block',
    },
  ],
  examples: [
    {
      output: '1636704767',
    },
  ],
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x42),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Block, 93),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
