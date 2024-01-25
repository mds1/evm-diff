import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const origin: Opcode = {
  number: 0x32,
  name: 'origin',
  description: 'Get execution origination address',
  minGas: 2,
  outputs: [
    {
      name: 'address',
      description:
        'The 20-byte address of the sender of the transaction. It can only be an account without code.',
    },
  ],
  examples: [
    {
      output: '0xbe862ad9abfe6f22bcb087716c7d89a26051f74c',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink('%27ORIGIN%27_'),
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    evmCodesOpcodesLink(0x32),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 93),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
