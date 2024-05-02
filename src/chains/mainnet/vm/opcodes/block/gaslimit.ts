import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroup, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import type { Opcode } from '@/types';

export const gaslimit: Opcode = {
	number: 0x45,
	name: 'gaslimit',
	description: "Get the block's gas limit",
	minGas: 2,
	outputs: [
		{
			name: 'gasLimit',
			description: 'The current block gas limit',
		},
	],
	examples: [
		{
			output: '0xffffffffffff',
		},
	],
	errorCases: ['Not enough gas', 'Stack overflow'],
	references: [
		evmCodesOpcodesLink(0x45),
		ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Block, 190),
	],
	supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
