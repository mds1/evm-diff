import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const msize: Omit<Opcode, 'examples'> = {
  number: 0x59,
  name: 'msize',
  description: 'Get the size of active memory in bytes',
  minGas: 2,
  outputs: [
    {
      name: 'size',
      description: 'The current memory size in bytes (higher offset accessed until now + 1)',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27jInitiallygkufirst~1mkx39upart%20of%20third~3ms%27~mqPOPqjNow%20size%20is%20v%20%2F%2F%20uqMLOADvRead%20q%5Cnm%20wordkqPUSH1gjMSIZEvg%200%01gjkmquv~_'
  ),
  errorCases: ['Not enough gas', 'Stack overflow'],
  notes: [
    'The memory is always fully accessible. What this instruction tracks is the highest offset that was accessed in the current execution. A first write or read to a bigger offset will trigger a memory expansion, which will cost gas. The size is always a multiple of a word (32 bytes).',
  ],
  references: [
    evmCodesOpcodesLink(0x59),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Arithmetic, 120),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
