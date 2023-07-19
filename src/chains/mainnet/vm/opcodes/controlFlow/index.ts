import { Opcode } from '@/types';
import { gas } from './gas';
import { jump } from './jump';
import { jumpdest } from './jumpdest';
import { jumpi } from './jumpi';
import { pc } from './pc';
import { stop } from './stop';

export const opcodes: Record<number, Partial<Opcode>> = {
  [gas.number]: gas,
  [jump.number]: jump,
  [jumpdest.number]: jumpdest,
  [jumpi.number]: jumpi,
  [pc.number]: pc,
  [stop.number]: stop,
};
