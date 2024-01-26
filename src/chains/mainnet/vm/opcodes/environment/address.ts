import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const address: Opcode = {
  number: 0x30,
  name: 'address',
  description: 'Get address of currently executing account',
  minGas: 2,
  outputs: [
    {
      name: 'address',
      description: 'The 20-byte address of the current account',
    },
  ],
  examples: [
    {
      output: '0x9bbfed6889322e016e0a02ee459d306fc19545d8',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink('%27ADDRESS%27_'),
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    evmCodesOpcodesLink(0x30),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 40),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
