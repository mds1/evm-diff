import { OpcodeMap } from '@/chains/types';
import { add } from './arithmetic/add';
import { blockhash } from './block/blockhash';
import { coinbase } from './block/coinbase';
import { number } from './block/number';
import { mstore } from './memory/mstore';

export const opcodes: OpcodeMap = {
  0x01: add,
  0x40: blockhash,
  0x41: coinbase,
  0x43: number,
  0x52: mstore,
};
