import { MainnetHardfork, getHardforksFromTo } from '@/chains/mainnet/hardforks';
import { OpcodeGroup, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const difficulty: Opcode = {
  number: 0x44,
  name: 'difficulty',
  description: "Get the block's difficulty",
  minGas: 2,
  outputs: [
    {
      name: 'difficulty',
      description: 'The current block difficulty',
    },
  ],
  examples: [
    {
      output: '10995000000000000',
    },
  ],
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x44),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.GrayGlacier, OpcodeGroup.Block, 22),
    },
  ],
  supportedHardforks: getHardforksFromTo(MainnetHardfork.Frontier, MainnetHardfork.GrayGlacier),
};
