import { Opcode } from '@/types/opcode';
import { blockhash } from './blockhash';
import { number } from './number';

export const opcodes: Opcode[] = [blockhash, number];
