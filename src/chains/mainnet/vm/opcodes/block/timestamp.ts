import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroup, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
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
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Block, 93),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
