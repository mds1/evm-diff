import { Opcode } from '@/types';
import { mstore } from './mstore';
import { mstore8 } from './mstore8';
import { mload } from './mload';
import { msize } from './msize';

export const opcodes: Record<number, Partial<Opcode>> = {
  [mload.number]: mload,
  [msize.number]: msize,
  [mstore.number]: mstore,
  [mstore8.number]: mstore8,
};
