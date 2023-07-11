import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const sar: Opcode = {
  number: 0x1d,
  name: 'sar',
  description: 'Arithmetic (signed) right shift operation',
  minGas: 3,
  inputs: [
    {
      name: 'shift',
      description: 'The number of bits to shift to the right',
    },
    {
      name: 'value',
      description: 'The 32 bytes to shift',
    },
  ],
  outputs: [
    {
      name: 'value >> shift',
      description: 'The shifted value',
    },
  ],
  examples: [
    {
      input: ['1', '2'],
      output: '1',
    },
    {
      input: ['4', '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF0'],
      output: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27y1z2z1twwy2v32%200xuuu0z4t%27~FFFFFFFzv1%20y%2F%2F%20Example%20w%5CnvwPUSHu~~~twSAR%01tuvwyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  notes: [
    'Shift the bits towards the least significant one. The bits moved before the first one are discarded, the new bits are set to 0 if the previous most significant bit was 0, otherwise the new bits are set to 1.',
  ],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x1d),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Bitwise, 213),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Constantinople),
};
