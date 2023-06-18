import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const shr: Opcode = {
  number: 0x1c,
  name: 'shr',
  description: 'Right shift operation',
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
      description: 'The shifted value. If shift is bigger than 255, returns 0.',
    },
  ],
  examples: [
    {
      input: ['1', '2'],
      output: '1',
    },
    {
      input: ['4', '0xFF'],
      output: '0xF',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1~2~1wyyz2~0xFF~4w%27~yPUSH1%20z%2F%2F%20Example%20y%5CnwySHR%01wyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  notes: [
    'Shift the bits towards the least significant one. The bits moved before the first one are discarded, the new bits are set to 0.',
  ],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x1c),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Bitwise, 185),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Constantinople),
};
