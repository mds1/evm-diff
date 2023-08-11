import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const sdiv: Opcode = {
  number: 0x05,
  name: 'sdiv',
  description: 'Signed integer division operation (truncated)',
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
        'The integer result of the signed integer division. If the denominator is 0, the result will be 0.',
    },
  ],
  examples: [
    {
      input: ['10', '10'],
      output: '1',
    },
    {
      input: [
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE',
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      ],
      output: '2',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27y1vvszzy2wrFwrEs%27~uuuz%5Cny%2F%2F%20Example%20wt32%200xr~vt1%2010uFFFtzPUSHszSDIVr~~~%01rstuvwyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  notes: [
    'All values are treated as two’s complement signed 256-bit integers. Note the overflow semantic when −2**255 is negated.',
  ],
  references: [
    evmCodesOpcodesLink(0x05),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Arithmetic, 141),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
