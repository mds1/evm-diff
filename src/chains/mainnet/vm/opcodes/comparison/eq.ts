import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const eq: Opcode = {
  number: 0x14,
  name: 'eq',
  description: 'Equality comparison',
  minGas: 3,
  inputs: [
    {
      name: 'a',
      description: 'The left side integer',
    },
    {
      name: 'b',
      description: 'The right side integer',
    },
  ],
  outputs: [
    {
      name: 'a == b',
      description:
        'The result of the equality comparison: 1 if the left side is equal to the right side and 0 otherwise',
    },
  ],
  examples: [
    {
      input: ['10', '10'],
      output: '1',
    },
    {
      input: ['10', '5'],
      output: '0',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1~10wyyz2~5w%27~yPUSH1%20z%2F%2F%20Example%20y%5Cnw~10yEQ%01wyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x14),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Comparison, 128),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
