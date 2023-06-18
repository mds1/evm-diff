import { Opcode } from '@/types';
import { address } from './address';
import { balance } from './balance';
import { calldatacopy } from './calldatacopy';
import { calldataload } from './calldataload';
import { calldatasize } from './calldatasize';
import { caller } from './caller';
import { callvalue } from './callvalue';
import { codecopy } from './codecopy';
import { codesize } from './codesize';
import { origin } from './origin';

export const opcodes: Record<number, Opcode> = {
  [address.number]: address,
  [balance.number]: balance,
  [calldatacopy.number]: calldatacopy,
  [calldataload.number]: calldataload,
  [calldatasize.number]: calldatasize,
  [caller.number]: caller,
  [callvalue.number]: callvalue,
  [codecopy.number]: codecopy,
  [codesize.number]: codesize,
  [origin.number]: origin,
};
