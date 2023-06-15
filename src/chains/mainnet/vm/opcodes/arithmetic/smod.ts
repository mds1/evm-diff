import { Hardforks, getHardforksFrom } from '@/lib/hardforks';
import { OpcodeGroups, ethSpecsOpcodeSrc } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const smod: Opcode = {
  number: 0x07,
  name: 'smod',
  description: 'Signed modulo remainder operation',
  minGas: 5,
  inputs: [
    { name: 'a', description: 'The integer numerator' },
    { name: 'b', description: 'The integer denominator' },
  ],
  outputs: [
    {
      name: 'a % b',
      description:
        'The integer result of the signed integer modulo. If the denominator is 0, the result will be 0.',
    },
  ],
  examples: [
    { input: ['10', '3'], output: '1' },
    {
      input: [
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF8',
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFD',
      ],
      output: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE',
    },
  ],
  playgroundLink:
    'https://www.evm.codes/playground?unit=Wei&codeType=Mnemonic&code=%27y1s3s10tzzy2wrDwr8t%27~uuuz%5Cny%2F%2F%20Example%20wv32%200xr~vzPUSHuFFFtzSMODsv1%20r~~~%01rstuvwyz~_',
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  notes: [
    'All values are treated as two’s complement signed 256-bit integers. Note the overflow semantic when −2**255 is negated.',
  ],
  references: [
    {
      name: 'evm.codes',
      url: 'https://www.evm.codes/#07?fork=shanghai',
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(OpcodeGroups.Arithmetic, 174),
    },
  ],
  supportedHardforks: getHardforksFrom(Hardforks.Frontier),
};
