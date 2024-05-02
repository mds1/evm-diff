import { push0 as baseOpcode } from '@/chains/mainnet/vm/opcodes/stack/push';
import type { Opcode } from '@/types';

export const push0: Opcode = {
	...baseOpcode,
	supportedHardforks: ['Canyon'],
};
