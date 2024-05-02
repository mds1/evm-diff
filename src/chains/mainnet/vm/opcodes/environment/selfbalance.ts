import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
	OpcodeGroup,
	ethSpecsOpcodeSrc,
	evmCodesOpcodesLink,
	evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import type { Opcode } from '@/types';

export const selfbalance: Opcode = {
	number: 0x47,
	name: 'selfbalance',
	description: 'Get balance of currently executing account',
	minGas: 5,
	outputs: [
		{
			name: 'balance',
			description: 'The balance of the current account in wei.',
		},
	],
	examples: [
		{
			output: '9',
		},
	],
	playgroundLink: evmCodesPlaygroundLink('%27SELFBALANCE%27_'),
	errorCases: ['Not enough gas', 'Stack overflow'],
	notes: [
		'Semantically equivalent of calling BALANCE with ADDRESS as parameter, but with a reduced gas cost.',
	],
	references: [
		evmCodesOpcodesLink(0x47),
		ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 491),
	],
	supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Istanbul),
};
