import type { Opcode } from '@/types';
import { and } from './and';
import { byte } from './byte';
import { not } from './not';
import { or } from './or';
import { sar } from './sar';
import { shl } from './shl';
import { shr } from './shr';
import { xor } from './xor';

export const opcodes: Record<number, Opcode> = {
	[and.number]: and,
	[byte.number]: byte,
	[not.number]: not,
	[or.number]: or,
	[sar.number]: sar,
	[shl.number]: shl,
	[shr.number]: shr,
	[xor.number]: xor,
};
