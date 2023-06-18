import { Opcode } from '@/types';
import { opcodes as dupOpcodes } from './dup';
import { pop } from './pop';
import { push0, opcodes as pushOpcodes } from './push';
import { opcodes as swapOpcodes } from './swap';

export const opcodes: Record<number, Opcode> = {
  ...dupOpcodes,
  [pop.number]: pop,
  [push0.number]: push0,
  ...pushOpcodes,
  ...swapOpcodes,
};
