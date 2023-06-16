import { Opcode } from '@/types';
import { opcodes as arithmeticOpcodes } from './arithmetic';
import { opcodes as blockOpcodes } from './block';
import { opcodes as memoryOpcodes } from './memory';

export const opcodes: Record<number, Opcode> = {
  ...arithmeticOpcodes,
  ...blockOpcodes,
  ...memoryOpcodes,
};
