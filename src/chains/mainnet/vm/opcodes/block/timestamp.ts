import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroup, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import type { Opcode } from '@/types';

export const timestamp: Opcode = {
	number: 0x42,
	name: 'timestamp',
	description: "Get the block's timestamp",
	minGas: 2,
	outputs: [
		{
			name: 'timestamp',
			description: 'unix timestamp of the current block',
		},
	],
	examples: [
		{
			output: '1636704767',
		},
	],
	errorCases: ['Not enough gas', 'Stack overflow'],
	references: [
		evmCodesOpcodesLink(0x42),
		ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Block, 93),
	],
	supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
