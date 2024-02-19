import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const extcodesize: Opcode = {
  number: 0x3b,
  name: 'extcodesize',
  description: "Get size of an account's code",
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
      description: 'The 20-byte address of the contract to query',
    },
  ],
  outputs: [
    {
      name: 'size',
      description: 'The byte size of the code',
    },
  ],
  examples: [
    {
      input: '0x43a61f3f4c73ea0d444c5c1c1a8544067a86219b',
      output: '32',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27gCQYtha*cQ8%20GJ%20a_-deW7...p0KWJ6l5260206lF3NNNNN0p32KjjgCBm8mY-dVabovep41p0p0jCREATE%20gPutsmnew)addresLjjgThVaddres_iL%2C%20wVcan%20querymsizejEXTCODESIZE%27~JJJFp91%20m%20thVl000j%5Cng%2F%2F)-ntrac*_s%20Y-nstructor%20W9G0xVe%20QB_a%20NlllL_onmstackKjMSTOREJFFG32%20Breate9jPUSH8fwith.~~~-co*t%20)%20f%01)*-.89BGJKLNQVWY_fgjlmp~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    evmCodesOpcodesLink(0x3b),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 324),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
