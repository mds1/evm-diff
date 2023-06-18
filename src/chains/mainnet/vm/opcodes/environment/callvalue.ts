import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
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
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x34),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Environment, 140),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
