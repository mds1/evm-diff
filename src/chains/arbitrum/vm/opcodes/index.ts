import { opcodes as mainnetOpcodes } from '@/chains/mainnet/vm/opcodes';
import { OpcodeMap } from '@/chains/types';
import { coinbase } from './block/coinbase';
import { number } from './block/number';

export const opcodes: OpcodeMap = {
  ...mainnetOpcodes,
  0x41: coinbase,
  0x43: number,
};
