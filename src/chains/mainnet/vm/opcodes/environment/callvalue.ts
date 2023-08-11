import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const callvalue: Opcode = {
  number: 0x34,
  name: 'callvalue',
  description: 'Get deposited value by the instruction/transaction responsible for this execution',
  minGas: 2,
  outputs: [
    {
      name: 'value',
      description: 'The value of the current call in wei',
    },
  ],
  examples: [
    {
      output: '123456789',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink('%27CALLVALUE%27_&callValue=123456789'),
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    evmCodesOpcodesLink(0x34),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 140),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
