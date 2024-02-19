import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const div: Opcode = {
  number: 0x04,
  name: 'div',
  description: 'Multiplication operation',
  minGas: 5,
  inputs: [
    {
      name: 'a',
      description: 'The integer numerator',
    },
    {
      name: 'b',
      description: 'The integer denominator',
    },
  ],
  outputs: [
    {
      name: 'a // b',
      description:
        'The integer result of the integer division. If the denominator is 0, the result will be 0.',
    },
  ],
  examples: [
    {
      input: ['10', '10'],
      output: '1',
    },
    {
      input: ['1', '2'],
      output: '0',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1~10~10wyyz2~2~1w%27~yPUSH1%20z%2F%2F%20Example%20y%5CnwyDIV%01wyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    evmCodesOpcodesLink(0x04),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Arithmetic, 111),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
