import { push0 as baseOpcode } from '@/chains/mainnet/vm/opcodes/stack/push';
import { Opcode } from '@/types';

export const push0: Opcode = {
  ...baseOpcode,
  supportedHardforks: ['ArbOS 11'],
};
