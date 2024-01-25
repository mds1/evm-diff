import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import { evmCodesOpcodesLink } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const invalid: Omit<Opcode, 'minGas' | 'examples' | 'errorCases'> = {
  number: 0xfe,
  name: 'invalid',
  description: 'Designated invalid instruction',
  notes: [
    'Equivalent to any other opcode not present in this reference, but guaranteed to remain an invalid instruction.',
    'Equivalent to REVERT (since Byzantium fork) with 0,0 as stack parameters, except that all the gas given to the current context is consumed.',
    'All the remaining gas in this context is consumed.',
  ],
  references: [evmCodesOpcodesLink(0xfe)],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
