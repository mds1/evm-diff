import { Opcode } from '@/types';
import { log0 } from './log0';
import { log1 } from './log1';
import { log2 } from './log2';
import { log3 } from './log3';
import { log4 } from './log4';

export const opcodes: Record<number, Partial<Opcode>> = {
  [log0.number]: log0,
  [log1.number]: log1,
  [log2.number]: log2,
  [log3.number]: log3,
  [log4.number]: log4,
};
