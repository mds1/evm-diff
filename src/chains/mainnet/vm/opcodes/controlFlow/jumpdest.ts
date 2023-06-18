import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const jumpdest: Omit<Opcode, 'examples' | 'errorCases'> = {
  number: 0x5b,
  name: 'jumpdest',
  description: 'Mark a valid destination for jumps',
  minGas: 1,
  notes: [
    'Mark a valid destination for JUMP or JUMPI. This operation has no effect on machine state during execution.',
  ],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x5b),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Arithmetic, 149),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
