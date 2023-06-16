import { id } from '@/lib/opcodes';
import { Opcode } from '@/types';
import { blockhash } from './blockhash';
import { coinbase } from './coinbase';
import { difficulty } from './difficulty';
import { gaslimit } from './gaslimit';
import { number } from './number';
import { prevrandao } from './prevrandao';
import { timestamp } from './timestamp';

export const opcodes: Record<number, Opcode> = {
  [blockhash.number]: blockhash,
  [coinbase.number]: coinbase,
  // `difficulty` and `prevrandao` have the same opcode numbers so we use `id()` to generate unique keys.
  [id(difficulty)]: difficulty,
  [id(prevrandao)]: prevrandao,
  [gaslimit.number]: gaslimit,
  [number.number]: number,
  [timestamp.number]: timestamp,
};
