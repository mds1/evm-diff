import { opcodes as mainnetOpcodes } from '@/chains/mainnet/vm/opcodes';
import { OpcodeMap } from '@/chains/types';
import { number } from './block/number';

export const opcodes: OpcodeMap = {
  ...mainnetOpcodes,
  0x43: number,
};
