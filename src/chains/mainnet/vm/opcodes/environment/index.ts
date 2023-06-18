import { Opcode } from '@/types';
import { address } from './address';
import { balance } from './balance';
import { caller } from './caller';
import { origin } from './origin';

export const opcodes: Record<number, Opcode> = {
  [address.number]: address,
  [balance.number]: balance,
  [caller.number]: caller,
  [origin.number]: origin,
};
