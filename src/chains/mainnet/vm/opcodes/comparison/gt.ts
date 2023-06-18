import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const gt: Opcode = {
  number: 0x11,
  name: 'gt',
  description: 'Greater-than comparison',
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
      name: 'a > b',
      description:
        'The result of the greater-than comparison: 1 if the left side is bigger and 0 otherwise',
    },
  ],
  examples: [
    {
      input: ['10', '9'],
      output: '1',
    },
    {
      input: ['10', '10'],
      output: '0',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1~9wyyz2~10w%27~yPUSH1%20z%2F%2F%20Example%20y%5Cnw~10yGT%01wyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x11),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Comparison, 75),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
