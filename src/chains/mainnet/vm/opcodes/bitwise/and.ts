import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const and: Opcode = {
  number: 0x16,
  name: 'and',
  description: 'Bitwise AND operation',
  minGas: 3,
  inputs: [
    {
      name: 'a',
      description: 'The first binary value',
    },
    {
      name: 'b',
      description: 'The second binary value',
    },
  ],
  outputs: [
    {
      name: 'a & b',
      description: 'The bitwise AND result',
    },
  ],
  examples: [
    {
      input: ['0xF', '0xF'],
      output: '0xF',
    },
    {
      input: ['0xFF', '0'],
      output: '0',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1~xF~xwyyz2~~xFw%27~yPUSH1%200z%2F%2F%20Example%20y%5CnwFyAND%01wyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    evmCodesOpcodesLink(0x16),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Bitwise, 22),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
