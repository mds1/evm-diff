import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
	OpcodeGroup,
	ethSpecsOpcodeSrc,
	evmCodesOpcodesLink,
	evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import type { Opcode } from '@/types';

export const not: Opcode = {
	number: 0x19,
	name: 'not',
	description: 'Bitwise NOT operation',
	minGas: 3,
	inputs: [
		{
			name: 'a',
			description: 'The binary value',
		},
	],
	outputs: [
		{
			name: '~a',
			description: 'The bitwise NOT result',
		},
	],
	examples: [
		{
			input: '0',
			output: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
		},
	],
	playgroundLink: evmCodesPlaygroundLink('%27PUSH1%200%5CnNOT%27_'),
	errorCases: ['Not enough gas', 'Not enough values on the stack'],
	references: [
		evmCodesOpcodesLink(0x19),
		ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Bitwise, 97),
	],
	supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
