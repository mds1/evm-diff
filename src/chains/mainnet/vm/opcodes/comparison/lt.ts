import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const lt: Opcode = {
  number: 0x10,
  name: 'lt',
  description: 'Less-than comparison',
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
      name: 'a < b',
      description:
        'The result of the less-than comparison: 1 if the left side is smaller and 0 otherwise',
    },
  ],
  examples: [
    {
      input: ['9', '10'],
      output: '1',
    },
    {
      input: ['10', '10'],
      output: '0',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1w~9yLTyyz2wwyLT%27~yPUSH1%20z%2F%2F%20Example%20y%5Cnw~10%01wyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    evmCodesOpcodesLink(0x10),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Comparison, 22),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
