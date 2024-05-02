import type { Opcode } from '@/types';
import { opcodes as arithmeticOpcodes } from './arithmetic';
import { opcodes as bitwiseOpcodes } from './bitwise';
import { opcodes as blockOpcodes } from './block';
import { opcodes as comparisonOpcodes } from './comparison';
import { opcodes as controlFlowOpcodes } from './controlFlow';
import { opcodes as environmentOpcodes } from './environment';
import { opcodes as keccakOpcodes } from './keccak';
import { opcodes as logOpcodes } from './log';
import { opcodes as memoryOpcodes } from './memory';
import { opcodes as stackOpcodes } from './stack';
import { opcodes as storageOpcodes } from './storage';
import { opcodes as systemOpcodes } from './system';

export const opcodes: Record<number, Partial<Opcode>> = {
	...arithmeticOpcodes,
	...bitwiseOpcodes,
	...blockOpcodes,
	...comparisonOpcodes,
	...controlFlowOpcodes,
	...environmentOpcodes,
	...keccakOpcodes,
	...logOpcodes,
	...memoryOpcodes,
	...stackOpcodes,
	...storageOpcodes,
	...systemOpcodes,
};
