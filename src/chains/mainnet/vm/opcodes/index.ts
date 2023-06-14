import { Opcode } from '@/types';
import { add } from './arithmetic/add';
import { blockhash } from './block/blockhash';
import { coinbase } from './block/coinbase';
import { number } from './block/number';
import { mstore } from './memory/mstore';

export const opcodes: Record<number, Opcode> = {
  ...{ [add.number]: add },
  ...{ [blockhash.number]: blockhash },
  ...{ [coinbase.number]: coinbase },
  ...{ [number.number]: number },
  ...{ [mstore.number]: mstore },
};
