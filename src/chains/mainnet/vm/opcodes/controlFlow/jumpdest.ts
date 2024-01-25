import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroup, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
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
    evmCodesOpcodesLink(0x5b),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Arithmetic, 149),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
