import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
	OpcodeGroup,
	ethSpecsOpcodeSrc,
	evmCodesOpcodesLink,
	evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import type { Opcode } from '@/types';

export const pc: Omit<Opcode, 'examples'> = {
	number: 0x58,
	name: 'pc',
	description:
		'Get the value of the program counter prior to the increment corresponding to this instruction',
	minGas: 2,
	outputs: [
		{
			name: 'counter',
			description: 'The PC of this instruction in the current program',
		},
	],
	playgroundLink: evmCodesPlaygroundLink(
		'%27~0x~1xJUMPDESTzesq2x~3xPUSH1%201%20l4x~6%20%7Bpreviouminstructionmtakem2%20bytes%7D%27~PCwwwlz%20%2F%2F%20Offx%5Cnw%20%20qt%20ms%20lzseq%01lmqwxz~_',
	),
	errorCases: ['Not enough gas', 'Not enough values on the stack'],
	notes: [
		'The program counter (PC) is a byte offset in the deployed code. It indicates which instruction will be executed next. When an ADD is executed, for example, the PC is incremented by 1, since the instruction is 1 byte. The PUSH instructions are bigger than one byte, and so will increment the counter accordingly.',
	],
	references: [
		evmCodesOpcodesLink(0x58),
		ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Arithmetic, 101),
	],
	supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
