import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroup, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import type { Opcode } from '@/types';

export const prevrandao: Opcode = {
	number: 0x44,
	name: 'prevrandao',
	description:
		"Get the random output of the beacon chain's randomness oracle for the previous block.",
	minGas: 2,
	outputs: [
		{
			name: 'random',
			description: "The random output of the beacon chain's oracle",
		},
	],
	examples: [
		{
			output: '0xce124dee50136f3f93f19667fb4198c6b94eecbacfa300469e5280012757be94',
		},
	],
	notes: [
		"Prior to the Paris hardfork, this opcode was named `difficulty` and returned the block's current difficulty. From Paris onwards, the `difficulty` opcode became `prevrandao`.",
	],
	// TODO: add the evm.codes playground link once available
	errorCases: ['Not enough gas.', 'Stack overflow.'],
	references: [
		evmCodesOpcodesLink(0x44),
		ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Block, 158),
		'https://eips.ethereum.org/EIPS/eip-4399',
	],
	supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
