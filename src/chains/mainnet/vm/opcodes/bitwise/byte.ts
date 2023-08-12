import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const byte: Opcode = {
  number: 0x1a,
  name: 'byte',
  description: 'Retrieve single byte from word',
  minGas: 3,
  inputs: [
    {
      name: 'i',
      description: 'The byte offset starting from the most significant byte',
    },
    {
      name: 'x',
      description: 'The 32-byte value',
    },
  ],
  outputs: [
    {
      name: 'y',
      description:
        'The indicated byte at the least significant position. If the byte offset is out of range, the result is 0.',
    },
  ],
  examples: [
    {
      input: ['31', '0xFF'],
      output: '0xFF',
    },
    {
      input: ['30', '0xFF00'],
      output: '0xFF00',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1~0xFF~31vyyz2w2%200xFF00~30v%27~w1%20z%2F%2F%20Example%20y%5CnwyPUSHvyBYTE%01vwyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    evmCodesOpcodesLink(0x1a),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Bitwise, 121),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
