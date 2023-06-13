import { opcodes as mainnetOpcodes } from '@/chains/mainnet/vm/opcodes';
import { Opcode, UndefinedOpcode } from '@/chains/types';
import { coinbase } from './block/coinbase';

export const opcodes: Record<number, Opcode | UndefinedOpcode> = {
  ...mainnetOpcodes,
  ...{ [coinbase.number]: coinbase },
};
