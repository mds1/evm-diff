import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const xor: Opcode = {
  number: 0x18,
  name: 'xor',
  description: 'Bitwise XOR operation',
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
      name: 'a ^ b',
      description: 'The bitwise XOR result',
    },
  ],
  examples: [
    {
      input: ['0xF0', '0xFF'],
      output: '0xF',
    },
    {
      input: ['0xFF', '0xFF'],
      output: '0',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1~~0wyyz2~F~Fw%27~yPUSH1%200xFz%2F%2F%20Example%20y%5CnwyXOR%01wyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    evmCodesOpcodesLink(0x18),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Bitwise, 72),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
