import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
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
    evmCodesOpcodesLink(0x48),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 517),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.London),
};
