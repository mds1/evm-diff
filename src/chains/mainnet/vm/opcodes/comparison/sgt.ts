import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const sgt: Opcode = {
  number: 0x13,
  name: 'sgt',
  description: 'Signed greater-than comparison',
  minGas: 3,
  inputs: [
    {
      name: 'a',
      description: 'The left side signed integer',
    },
    {
      name: 'b',
      description: 'The right side signed integer',
    },
  ],
  outputs: [
    {
      name: 'a > b',
      description:
        'The result of the signed greater-than comparison: 1 if the left side is bigger and 0 otherwise',
    },
  ],
  examples: [
    {
      input: ['10', '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'],
      output: '1',
    },
    {
      input: ['10', '10'],
      output: '0',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27y1v32%200xssssz9twwy2z10z10t%27~uuuuzv1%20y%2F%2F%20Example%20w%5CnvwPUSHuFFtwSGTs~~%01stuvwyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x13),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Comparison, 102),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};