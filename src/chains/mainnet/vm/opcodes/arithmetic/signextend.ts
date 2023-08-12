import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const signextend: Opcode = {
  number: 0x0b,
  name: 'signextend',
  description: "Extend length of two's complement signed integer",
  minGas: 5,
  inputs: [
    {
      name: 'b',
      description: 'The size in byte minus 1 of the integer to sign extend',
    },
    {
      name: 'x',
      description: 'The integer value to sign extend',
    },
  ],
  outputs: [
    {
      name: 'y',
      description: 'The integer result of the sign extend',
    },
  ],
  examples: [
    {
      input: ['0', '0xFF'],
      output: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    },
    {
      input: ['0', '0x7F'],
      output: '0x7F',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1~xFywwz2~x7y%27~wPUSH1%200z%2F%2F%20Example%20yF~wSIGNEXTENDw%5Cn%01wyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    evmCodesOpcodesLink(0x0b),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Arithmetic, 329),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
