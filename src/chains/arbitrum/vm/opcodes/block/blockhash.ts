import { blockhash as baseOpcode } from '@/chains/mainnet/vm/opcodes/block/blockhash';
import type { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, ...opcode } = baseOpcode;
export const blockhash: Omit<Opcode, 'supportedHardforks'> = {
	...opcode,
	description:
		'Returns a cryptographically insecure, pseudo-random hash for `x` within the range `block.number - 256 <= x < block.number`. If `x` is outside of this range, `blockhash(x)` will return 0. This includes `blockhash(block.number)`, which always returns 0 just like on Ethereum. The hashes returned do not come from L1.',
	outputs: [
		{
			name: 'hash',
			description:
				'The pseudo-random hash for the input block number, or 0 if the block number is not in the valid range',
		},
	],
	examples: [
		{
			input: '17813636',
			output: '0xfe4f20b10608dbb75f84782733dd434832c50192993f7389386dfa40f6feda4b',
		},
	],
	references: [
		'[Arbitrum Differences from Solidity on Ethereum](https://developer.arbitrum.io/solidity-support)',
	],
};
