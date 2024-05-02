import type { Opcode } from '@/types';
import { mload } from './mload';
import { msize } from './msize';
import { mstore } from './mstore';
import { mstore8 } from './mstore8';

export const opcodes: Record<number, Partial<Opcode>> = {
	[mload.number]: mload,
	[msize.number]: msize,
	[mstore.number]: mstore,
	[mstore8.number]: mstore8,
};
