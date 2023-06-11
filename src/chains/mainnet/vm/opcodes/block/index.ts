import { Opcode } from '@/chains/types';
import { blockhash } from './blockhash';
import { number } from './number';

export const opcodes: Opcode[] = [blockhash, number];
