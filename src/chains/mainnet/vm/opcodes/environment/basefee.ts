import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const basefee: Opcode = {
  number: 0x48,
  name: 'basefee',
  description: 'Get the base fee',
  minGas: 2,
  outputs: [
    {
      name: 'baseFee',
      description: 'The base fee in wei.',
    },
  ],
  examples: [
    {
      output: '10',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink('%27BASEFEE%27_'),
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x48),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Environment, 517),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.London),
};
