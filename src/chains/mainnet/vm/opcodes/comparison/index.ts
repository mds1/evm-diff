import { Opcode } from '@/types';
import { eq } from './eq';
import { gt } from './gt';
import { iszero } from './iszero';
import { lt } from './lt';
import { sgt } from './sgt';
import { slt } from './slt';

export const opcodes: Record<number, Opcode> = {
  [eq.number]: eq,
  [gt.number]: gt,
  [iszero.number]: iszero,
  [lt.number]: lt,
  [sgt.number]: sgt,
  [slt.number]: slt,
};
