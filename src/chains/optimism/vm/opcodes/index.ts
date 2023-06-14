import { opcodes as mainnetOpcodes } from '@/chains/mainnet/vm/opcodes';
import { Opcode } from '@/types';
import { coinbase } from './block/coinbase';

export const opcodes: Record<number, Partial<Opcode>> = {
  ...mainnetOpcodes,
  ...{ [coinbase.number]: coinbase },
};
