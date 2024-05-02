import type { Opcode } from '@/types';
import { blockhash } from './blockhash';
import { coinbase } from './coinbase';
import { gaslimit } from './gaslimit';
import { number } from './number';
import { prevrandao } from './prevrandao';
import { timestamp } from './timestamp';

export const opcodes: Record<number, Opcode> = {
	[blockhash.number]: blockhash,
	[coinbase.number]: coinbase,
	[prevrandao.number]: prevrandao,
	[gaslimit.number]: gaslimit,
	[number.number]: number,
	[timestamp.number]: timestamp,
};
