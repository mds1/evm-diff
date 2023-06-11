import { blockhash } from '@/chains/mainnet/vm/opcodes/block/blockhash';
import { Opcode } from '@/chains/types';
import { number } from './number';

const modifiedOpcodes: Opcode[] = [number];

const mainnetOpcodes: Opcode[] = [blockhash];

export const opcodes: Opcode[] = [...modifiedOpcodes, ...mainnetOpcodes];
