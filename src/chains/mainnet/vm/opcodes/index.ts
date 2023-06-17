import { Opcode } from '@/types';
import { opcodes as arithmeticOpcodes } from './arithmetic';
import { opcodes as blockOpcodes } from './block';
import { opcodes as logOpcodes } from './log';
import { opcodes as memoryOpcodes } from './memory';

export const opcodes: Record<number, Partial<Opcode>> = {
  ...arithmeticOpcodes,
  ...blockOpcodes,
  ...logOpcodes,
  ...memoryOpcodes,
};
