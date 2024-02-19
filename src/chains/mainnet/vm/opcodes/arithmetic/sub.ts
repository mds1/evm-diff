import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const sub: Opcode = {
  number: 0x03,
  name: 'sub',
  description: 'Subtraction operation',
  minGas: 3,
  inputs: [
    {
      name: 'a',
      description: 'The first integer value',
    },
    {
      name: 'b',
      description: 'The second integer value to subtract to the first',
    },
  ],
  outputs: [
    {
      name: 'a - b',
      description: 'The integer result of the subtraction modulo 2**256',
    },
  ],
  examples: [
    {
      input: ['10', '10'],
      output: '0',
    },
    {
      input: ['0', '1'],
      output: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1~10~1wyyz2~1~w%27~yPUSH1%20z%2F%2F%20Example%20y%5Cnw0ySUB%01wyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    evmCodesOpcodesLink(0x03),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Arithmetic, 57),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
