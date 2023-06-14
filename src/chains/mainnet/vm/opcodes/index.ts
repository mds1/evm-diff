import { Opcode } from '@/types';
import { add } from './arithmetic/add';
import { addmod } from './arithmetic/addmod';
import { div } from './arithmetic/div';
import { exp } from './arithmetic/exp';
import { mod } from './arithmetic/mod';
import { mul } from './arithmetic/mul';
import { mulmod } from './arithmetic/mulmod';
import { sdiv } from './arithmetic/sdiv';
import { signextend } from './arithmetic/signextend';
import { smod } from './arithmetic/smod';
import { sub } from './arithmetic/sub';
import { blockhash } from './block/blockhash';
import { coinbase } from './block/coinbase';
import { number } from './block/number';
import { mstore } from './memory/mstore';

export const opcodes: Record<number, Opcode> = {
  // arithmetic
  ...{ [add.number]: add },
  ...{ [addmod.number]: addmod },
  ...{ [div.number]: div },
  ...{ [exp.number]: exp },
  ...{ [mod.number]: mod },
  ...{ [mul.number]: mul },
  ...{ [mulmod.number]: mulmod },
  ...{ [sdiv.number]: sdiv },
  ...{ [signextend.number]: signextend },
  ...{ [smod.number]: smod },
  ...{ [sub.number]: sub },

  // block
  ...{ [blockhash.number]: blockhash },
  ...{ [coinbase.number]: coinbase },
  ...{ [number.number]: number },

  // memory
  ...{ [mstore.number]: mstore },
};
