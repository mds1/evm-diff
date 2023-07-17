import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const shl: Opcode = {
  number: 0x1b,
  name: 'shl',
  description: 'Left shift operation',
  minGas: 3,
  inputs: [
    {
      name: 'shift',
      description: 'The number of bits to shift to the left',
    },
    {
      name: 'value',
      description: 'The 32 bytes to shift',
    },
  ],
  outputs: [
    {
      name: 'value << shift',
      description: 'The shifted value. If shift is bigger than 255, returns 0.',
    },
  ],
  examples: [
    {
      input: ['1', '1'],
      output: '2',
    },
    {
      input: ['4', '0xFF00000000000000000000000000000000000000000000000000000000000000'],
      output: '0xF000000000000000000000000000000000000000000000000000000000000000',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27y1z1z1swwy2v32%200xFFuuuuutz4s%27~tttzv1%20y%2F%2F%20Example%20w%5CnvwPUSHu~~t00swSHL%01stuvwyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  notes: [
    'Shift the bits towards the least significant one. The bits moved before the first one are discarded, the new bits are set to 0.',
  ],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x1b),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Bitwise, 157),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Constantinople),
};
