import { Opcode } from '@/types';
import { mstore } from './mstore';

export const opcodes: Record<number, Opcode> = {
  [mstore.number]: mstore,
};
