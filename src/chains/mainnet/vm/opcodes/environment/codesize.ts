import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const codesize: Opcode = {
  number: 0x38,
  name: 'codesize',
  description: 'Get size of code running in current environment',
  minGas: 2,
  outputs: [
    {
      name: 'size',
      description: 'The byte size of the code',
    },
  ],
  examples: [
    {
      output: '32',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27%2F%2F%20Add%20som~instructions%20to%20increas~th~cod~sizeyPUSH29%200yPOPyyCODESIZE%27~e%20y%5Cn%01y~_'
  ),
  errorCases: ['Not enough gas', 'Stack overflow'],
  notes: [
    'Each instruction occupies one byte. In the case of a PUSH instruction, the bytes that need to be pushed are encoded after that, it thus increases the codesize accordingly.',
  ],
  references: [
    evmCodesOpcodesLink(0x38),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 247),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
