import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const caller: Opcode = {
  number: 0x33,
  name: 'caller',
  description: 'Get caller address',
  minGas: 2,
  outputs: [
    {
      name: 'address',
      description:
        "The 20-byte address of the caller's account. This is the account that did the last call (except delegate call).",
    },
  ],
  examples: [
    {
      output: '0xbe862ad9abfe6f22bcb087716c7d89a26051f74c',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink('%27CALLER%27_'),
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x33),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 117),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
