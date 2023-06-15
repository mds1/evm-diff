import { Opcode } from '@/types';
import { blockhash } from './blockhash';
import { coinbase } from './coinbase';
import { number } from './number';

export const opcodes: Record<number, Opcode> = {
  [blockhash.number]: blockhash,
  [coinbase.number]: coinbase,
  [number.number]: number,
};
