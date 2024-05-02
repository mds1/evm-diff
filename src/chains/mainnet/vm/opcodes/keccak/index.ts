import type { Opcode } from '@/types';
import { keccak } from './keccak';

export const opcodes: Record<number, Opcode> = {
	[keccak.number]: keccak,
};
