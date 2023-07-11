import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroups, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const prevrandao: Opcode = {
  number: 0x44,
  name: 'prevrandao',
  description:
    "Get the random output of the beacon chain's randomness oracle for the previous block",
  minGas: 2,
  outputs: [
    {
      name: 'random',
      description: "The random output of the beacon chain's oracle",
    },
  ],
  examples: [
    {
      output: '10995000000000000',
    },
  ],
  // TODO: add the evm.codes playground link once available
  errorCases: ['Not enough gas.', 'Stack overflow.'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x44),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Block, 158),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Paris),
};
