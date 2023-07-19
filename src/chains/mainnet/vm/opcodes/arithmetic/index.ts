import { Opcode } from '@/types';
import { add } from './add';
import { addmod } from './addmod';
import { div } from './div';
import { exp } from './exp';
import { mod } from './mod';
import { mul } from './mul';
import { mulmod } from './mulmod';
import { sdiv } from './sdiv';
import { signextend } from './signextend';
import { smod } from './smod';
import { sub } from './sub';

export const opcodes: Record<number, Opcode> = {
  [add.number]: add,
  [addmod.number]: addmod,
  [div.number]: div,
  [exp.number]: exp,
  [mod.number]: mod,
  [mul.number]: mul,
  [mulmod.number]: mulmod,
  [sdiv.number]: sdiv,
  [signextend.number]: signextend,
  [smod.number]: smod,
  [sub.number]: sub,
};
