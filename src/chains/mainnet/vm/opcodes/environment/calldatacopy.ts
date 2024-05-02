import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
	OpcodeGroup,
	ethSpecsOpcodeSrc,
	evmCodesOpcodesLink,
	evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import type { Opcode } from '@/types';

export const calldatacopy: Opcode = {
	number: 0x37,
	name: 'calldatacopy',
	description: 'Copy input data in current environment to memory',
	minGas: 3,
	gasComputation: {
		staticGasCost: {
			expression: '3',
		},
		dynamicGasCost: {
			expression: '3 * minimum_word_size + memory_expansion_cost',
			variables: [
				{
					name: 'minimum_word_size',
					description: 'The minimum size of the word to copy',
					expression: '(size + 31) / 32',
				},
				{
					name: 'memory_expansion_cost',
					description:
						'During a smart contract execution, memory can be accessed with opcodes. When an offset is first accessed (either read or write), memory may trigger an expansion, which costs gas. Memory expansion may be triggered when the byte offset (modulo 32) accessed is bigger than previous offsets. If a larger offset trigger of memory expansion occurs, the cost of accessing the higher offset is computed and removed from the total gas available at the current call context. Thus, only the additional bytes of memory must be paid for.',
					expression: 'memory_expansion_cost = new_memory_cost - last_memory_cost',
					variables: [
						{
							name: 'memory_cost',
							description: 'The memory cost function for a given machine state',
							expression: '(memory_size_word ** 2) / 512 + (3 * memory_size_word)',
						},
						{
							name: 'memory_size_word',
							description:
								'Number of (32-byte) words required for memory after the operation in question',
							expression: '(memory_byte_size + 31) / 32',
						},
						{
							name: 'memory_byte_size',
							description:
								'The highest referenced memory address after the operation in question (in bytes)',
						},
					],
				},
			],
		},
	},
	inputs: [
		{
			name: 'destOffset',
			description: 'The byte offset in the memory where the result will be copied',
		},
		{
			name: 'offset',
			description: 'The byte offset in the calldata to copy',
		},
		{
			name: 'size',
			description: 'The byte size to copy',
		},
	],
	examples: [
		{
			input: ['0', '0', '32'],
			calldata: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
			memory: {
				before: '0',
				after: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
			},
		},
		{
			input: ['0', '31', '8'],
			calldata: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
			memory: {
				before: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
				after: '0xFF00000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
			},
		},
	],
	playgroundLink: evmCodesPlaygroundLink(
		'%27z1~32~0ywwz2~8~31y%27~wPUSH1%20z%2F%2F%20Example%20y~0wCALLDATACOPYw%5Cn%01wyz~_&callData=0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
	),
	errorCases: ['Not enough gas', 'Not enough values on the stack'],
	references: [
		evmCodesOpcodesLink(0x37),
		'[evm.codes, Memory Expansion](https://www.evm.codes/about#memoryexpansion)',
		ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 212),
	],
	supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
