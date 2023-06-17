import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const mod: Opcode = {
  number: 0x06,
  name: 'mod',
  description: 'Modulo remainder operation',
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
      name: 'a % b',
      description:
        'The integer result of the integer modulo. If the denominator is 0, the result will be 0.',
    },
  ],
  examples: [
    {
      input: ['10', '3'],
      output: '1',
    },
    {
      input: ['17', '5'],
      output: '2',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1~3~10wyyz2~5~17w%27~yPUSH1%20z%2F%2F%20Example%20y%5CnwyMOD%01wyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x06),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Arithmetic, 174),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
