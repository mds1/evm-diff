import { OpcodeMap } from '@/chains/types';
import { add } from './arithmetic/add';
import { blockhash } from './block/blockhash';
import { number } from './block/number';
import { mstore } from './memory/mstore';

export const opcodes: OpcodeMap = {
  0x1: add,
  0x40: blockhash,
  0x43: number,
  0x52: mstore,
};
