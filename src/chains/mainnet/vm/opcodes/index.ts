import { Opcode } from '@/chains/types';
import { opcodes as arithmeticOpcodes } from './arithmetic';
import { opcodes as blockOpcodes } from './block';
import { opcodes as memoryOpcodes } from './memory';

export const opcodes: Opcode[] = [...arithmeticOpcodes, ...blockOpcodes, ...memoryOpcodes];
