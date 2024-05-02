import type { Opcode } from '@/types';
import { sload } from './sload';
import { sstore } from './sstore';

export const opcodes: Record<number, Opcode> = {
	[sload.number]: sload,
	[sstore.number]: sstore,
};
