import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const or: Opcode = {
  number: 0x17,
  name: 'or',
  description: 'Bitwise OR operation',
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
      name: 'a | b',
      description: 'The bitwise OR result',
    },
  ],
  examples: [
    {
      input: ['0xF0', '0xFF'],
      output: '0xF',
    },
    {
      input: ['0xFF', '0xFF'],
      output: '0xFF',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1~~0yORyyz2~F~FyOR%27~yPUSH1%200xFz%2F%2F%20Example%20y%5Cn%01yz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    evmCodesOpcodesLink(0x17),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Bitwise, 47),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
