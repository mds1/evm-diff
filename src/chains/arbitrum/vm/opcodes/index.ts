import { opcodes as mainnetOpcodes } from '@/chains/mainnet/vm/opcodes';
import { Opcode } from '@/types';
import { coinbase } from './block/coinbase';
import { number } from './block/number';

export const opcodes: Record<number, Partial<Opcode>> = {
  ...mainnetOpcodes,
  ...{ [coinbase.number]: coinbase },
  ...{ [number.number]: number },
};
