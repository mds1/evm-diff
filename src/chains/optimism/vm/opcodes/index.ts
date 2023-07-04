import { opcodes as mainnetOpcodes } from '@/chains/mainnet/vm/opcodes';
import { Opcode } from '@/types';
import { coinbase } from './block/coinbase';
import { difficulty } from './block/difficulty';
import { number } from './block/number';
import { timestamp } from './block/timestamp';
import { caller } from './environment/caller';
import { origin } from './environment/origin';
import { push0 } from './stack/push0';

export const opcodes: Record<number, Partial<Opcode>> = {
  ...mainnetOpcodes,

  // block
  ...{ [coinbase.number]: coinbase },
  ...{ [difficulty.number]: difficulty },
  ...{ [number.number]: number },
  ...{ [timestamp.number]: timestamp },

  // environment
  ...{ [caller.number]: caller },
  ...{ [origin.number]: origin },

  // stack
  ...{ [push0.number]: push0 },
};
