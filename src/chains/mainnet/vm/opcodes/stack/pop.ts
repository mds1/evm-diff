import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import { CURRENT_MAINNET_HARDFORK } from '@/lib/constants';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const pop: Opcode = {
  number: 0x50,
  name: 'pop',
  description: 'Remove item from stack',
  minGas: 2,
  inputs: [
    {
      name: 'y',
      description: 'A stack item',
    },
  ],
  examples: [
    {
      input: '125985',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink('%27PUSH3%20125985%5CnPOP%27_'),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    evmCodesOpcodesLink(0x50),
    ethSpecsOpcodeSrc(CURRENT_MAINNET_HARDFORK, OpcodeGroup.Stack, 26),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
