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
import { gasprice } from './gasprice';
import { origin } from './origin';
import { extcodecopy } from './extcodecopy';
import { extcodehash } from './extcodehash';
import { extcodesize } from './extcodesize';
import { returndatacopy } from './returndatacopy';
import { returndatasize } from './returndatasize';

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
  [extcodecopy.number]: extcodecopy,
  [extcodehash.number]: extcodehash,
  [extcodesize.number]: extcodesize,
  [gasprice.number]: gasprice,
  [origin.number]: origin,
  [returndatacopy.number]: returndatacopy,
  [returndatasize.number]: returndatasize,
};
