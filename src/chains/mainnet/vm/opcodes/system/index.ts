import type { Opcode } from '@/types';
import { call } from './call';
import { callcode } from './callcode';
import { create } from './create';
import { create2 } from './create2';
import { delegatecall } from './delegatecall';
import { invalid } from './invalid';
import { _return } from './return';
import { revert } from './revert';
import { selfdestruct } from './selfdestruct';
import { staticcall } from './staticcall';

export const opcodes: Record<number, Partial<Opcode>> = {
	[call.number]: call,
	[callcode.number]: callcode,
	[create.number]: create,
	[create2.number]: create2,
	[delegatecall.number]: delegatecall,
	[invalid.number]: invalid,
	[_return.number]: _return,
	[revert.number]: revert,
	[selfdestruct.number]: selfdestruct,
	[staticcall.number]: staticcall,
};
