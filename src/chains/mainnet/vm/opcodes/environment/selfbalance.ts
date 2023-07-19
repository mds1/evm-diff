import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const selfbalance: Opcode = {
  number: 0x47,
  name: 'selfbalance',
  description: 'Get balance of currently executing account',
  minGas: 5,
  outputs: [
    {
      name: 'balance',
      description: 'The balance of the current account in wei.',
    },
  ],
  examples: [
    {
      output: '9',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink('%27SELFBALANCE%27_'),
  errorCases: ['Not enough gas', 'Stack overflow'],
  notes: [
    'Semantically equivalent of calling BALANCE with ADDRESS as parameter, but with a reduced gas cost.',
  ],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x47),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 491),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Istanbul),
};
