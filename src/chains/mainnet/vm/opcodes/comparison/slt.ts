import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const slt: Opcode = {
  number: 0x12,
  name: 'slt',
  description: 'Signed less-than comparison',
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
      name: 'a < b',
      description:
        'The result of the signed less-than comparison: 1 if the left side is smaller and 0 otherwise',
    },
  ],
  examples: [
    {
      input: ['0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', '0'],
      output: '1',
    },
    {
      input: ['10', '10'],
      output: '0',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27y1z9v32%200xsssstwwy2z10z10t%27~uuuuzv1%20y%2F%2F%20Example%20w%5CnvwPUSHuFFtwSLTs~~%01stuvwyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  notes: ['All values are treated as two’s complement signed 256-bit integers.'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x12),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Comparison, 49),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
