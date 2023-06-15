import { Opcode } from '@/types';
import { opcodes as arithmeticOpcodes } from './arithmetic';
import { opcodes as blockOpcodes } from './arithmetic';
import { opcodes as memoryOpcodes } from './arithmetic';

export const opcodes: Record<number, Opcode> = {
  ...arithmeticOpcodes,
  ...blockOpcodes,
  ...memoryOpcodes,
};
