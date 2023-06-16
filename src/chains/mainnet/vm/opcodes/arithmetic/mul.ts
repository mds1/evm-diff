import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const mul: Opcode = {
  number: 0x02,
  name: 'mul',
  description: 'Multiplication operation',
  minGas: 5,
  inputs: [
    { name: 'a', description: 'The first integer value to multiply' },
    { name: 'b', description: 'The second integer value to multiply' },
  ],
  outputs: [
    { name: 'a * b', description: 'The integer result of the multiplication modulo 2**256' },
  ],
  examples: [
    { input: ['10', '10'], output: '100' },
    {
      input: ['0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', '2'],
      output: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27y1z10z10twwy2v32%200xssssz2t%27~uuuuzv1%20y%2F%2F%20Example%20w%5CnvwPUSHuFFtwMULs~~%01stuvwyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x02),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Arithmetic, 84),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
