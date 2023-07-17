import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const extcodehash: Opcode = {
  number: 0x3f,
  name: 'extcodehash',
  description: "Get hash of an account's code",
  minGas: 100,
  gasComputation: {
    staticGasCost: {
      expression: '0',
    },
    dynamicGasCost: {
      expression: '100 if the accessed address is warm, 2600 otherwise',
    },
  },
  inputs: [
    {
      name: 'address',
      description: 'The 20-byte address of the account',
    },
  ],
  outputs: [
    {
      name: 'hash',
      description:
        "The hash of the chosen account's code, the empty hash (0xc5d24601...) if the account has no code, or 0 if the account does not exist or has been destroyed.",
    },
  ],
  examples: [
    {
      input: '0x43a61f3f4c73ea0d444c5c1c1a8544067a86219b',
      output: '0xc5d2460186f7233c927e7db2dcc703c0e500b653ca82273b7bfad8045d85a470',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27yClmthaWcl_%204%20FFZjYdeg3%200x63FFFFFFFF60005260046000F3q0~MSTORE~~yCfz_zmYdeZboveq13q0q0~CREATE%20yPutsznewVaddresjonzstack~~yGetzhash~EXTCODEHASH%27~%5Cnz%20the%20y%2F%2F%20qgVYntracWmYnstructor%20lfja%20js%20g~PUSH1freate_pwithZ%20aYcoWt%20V%20p%01VWYZ_fgjlmpqyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x3f),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 444),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Constantinople),
};
