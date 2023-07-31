import { opcodes as mainnetOpcodes } from '@/chains/mainnet/vm/opcodes';
import { Opcode } from '@/types';
import { blockhash } from './block/blockhash';
import { coinbase } from './block/coinbase';
import { number } from './block/number';
import { prevrandao } from './block/prevrandao';
import { caller } from './environment/caller';
import { origin } from './environment/origin';
import { push0 } from './stack/push0';

export const opcodes: Record<number, Partial<Opcode>> = {
  ...mainnetOpcodes,

  // block
  ...{ [blockhash.number]: blockhash },
  ...{ [coinbase.number]: coinbase },
  ...{ [prevrandao.number]: prevrandao },
  ...{ [number.number]: number },

  // environment
  ...{ [caller.number]: caller },
  ...{ [origin.number]: origin },

  // stack
  ...{ [push0.number]: push0 },
};
