import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const iszero: Opcode = {
  number: 0x15,
  name: 'iszero',
  description: 'Simple NOT (or non-zero )operator',
  minGas: 3,
  inputs: [
    {
      name: 'a',
      description: 'An integer value',
    },
  ],
  outputs: [
    {
      name: 'a == 0',
      description:
        'The result of the zero equality comparison: 1 if the a is equal to O and 0 otherwise',
    },
  ],
  examples: [
    {
      input: '10',
      output: '0',
    },
    {
      input: '0',
      output: '1',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27~1y1wzz~2yw%27~%2F%2F%20Example%20z%5CnyzPUSH1%20w0zISZERO%01wyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    evmCodesOpcodesLink(0x15),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Comparison, 155),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
