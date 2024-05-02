import { opcodes as mainnetOpcodes } from '@/chains/mainnet/vm/opcodes';
import type { Opcode } from '@/types';
import { coinbase } from './block/coinbase';
import { prevrandao } from './block/prevrandao';
import { caller } from './environment/caller';
import { origin } from './environment/origin';
import { push0 } from './stack/push0';

export const opcodes: Record<number, Partial<Opcode>> = {
	...mainnetOpcodes,

	// Block.
	...{ [coinbase.number]: coinbase },
	...{ [prevrandao.number]: prevrandao },

	// Environment.
	...{ [caller.number]: caller },
	...{ [origin.number]: origin },

	// Stack.
	...{ [push0.number]: push0 },
};
