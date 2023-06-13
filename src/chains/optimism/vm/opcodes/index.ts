import { opcodes as mainnetOpcodes } from '@/chains/mainnet/vm/opcodes';
import { OpcodeMap } from '@/chains/types';
import { coinbase } from './block/coinbase';

export const opcodes: OpcodeMap = {
  ...mainnetOpcodes,
  0x41: coinbase,
};
