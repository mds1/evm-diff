import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroup, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import type { Opcode } from '@/types';

export const blockhash: Opcode = {
	number: 0x40,
	name: 'blockhash',
	description: 'Get the hash of one of the 256 most recent complete blocks.',
	minGas: 20,
	inputs: [
		{
			name: 'blockNumber',
			description:
				'The block number to get the hash from. Valid range is the last 256 blocks (not including the current one). Current block number can be queried with NUMBER.',
		},
	],
	outputs: [
		{
			name: 'hash',
			description:
				'The hash of the chosen block, or 0 if the block number is not in the valid range',
		},
	],
	examples: [
		{
			input: '17813636',
			output: '0x3204feac1c276343f84e44df04f8fcddbb80eee246ee0533026511e4c4bbf4b6',
		},
	],
	errorCases: ['Not enough gas', 'Not enough values on the stack'],
	references: [
		evmCodesOpcodesLink(0x40),
		ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Block, 22),
	],
	supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
