import { Opcode } from '@/types';
import { opcodes as logOpcodes } from './log';

export const opcodes: Record<number, Partial<Opcode>> = {
  ...logOpcodes,
};
