import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const exp: Opcode = {
  number: 0x0a,
  name: 'exp',
  description: 'Exponential operation',
  minGas: 10,
  gasComputation: {
    staticGasCost: {
      expression: '10',
    },
    dynamicGasCost: {
      expression: '50 * exponent_byte_size',
      variables: [
        {
          name: 'exponent_byte_size',
          description: 'The exponent representation in bytes',
        },
      ],
    },
  },
  inputs: [
    {
      name: 'a',
      description: 'The integer base',
    },
    {
      name: 'exponent',
      description: 'The integer exponent',
    },
  ],
  outputs: [
    {
      name: 'a ** exponent',
      description: 'The integer result of the exponential operation modulo 2**256',
    },
  ],
  examples: [
    {
      input: ['10', '2'],
      output: '100',
    },
    {
      input: ['2', '2'],
      output: '4',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1~2~10wyyz2~2~2w%27~yPUSH1%20z%2F%2F%20Example%20y%5CnwyEXP%01wyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  notes: ['All intermediate calculations of this operation are not subject to the 2**256 modulo'],
  references: [
    evmCodesOpcodesLink(0x0a),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Arithmetic, 296),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
