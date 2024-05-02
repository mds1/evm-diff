import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
	OpcodeGroup,
	ethSpecsOpcodeSrc,
	evmCodesOpcodesLink,
	evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import type { Opcode } from '@/types';

export const revert: Opcode = {
	number: 0xfd,
	name: 'revert',
	description: 'Halt execution reverting state changes but returning data and remaining gas',
	minGas: 0,
	gasComputation: {
		staticGasCost: {
			expression: '0',
		},
		dynamicGasCost: {
			expression: 'memory_expansion_cost',
			variables: [
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
			name: 'offset',
			description: 'The byte offset in the memory in bytes. The return data of the calling context',
		},
		{
			name: 'size',
			description: 'The byte size to copy (size of the return data)',
		},
	],
	examples: [
		{
			input: ['0', '2'],
			memory: {
				before: '0xFF01',
				after: '0xFF01',
			},
			returndata: '0xFF01', // calling context return data
		},
	],
	playgroundLink: evmCodesPlaygroundLink(
		'%27wSet%20the%20statev32%200xFF01uuuuuz0yMSTOREyywExamplez2z0yREVERT%27~000000zv1%20y%5Cnw%2F%2F%20vyPUSHu~~%01uvwyz~_',
	),
	errorCases: ['Not enough gas', 'Not enough values on the stack'],
	notes: [
		'Stop the current context execution, revert the state changes (see STATICCALL for a list of state changing opcodes) and return the unused gas to the caller. It also reverts the gas refund to its value before the current context. If the execution is stopped with REVERT, the value 0 is put on the stack of the calling context, which continues to execute normally. The return data of the calling context is set as the given chunk of memory of this context.',
	],
	references: [
		evmCodesOpcodesLink(0xfd),
		ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.System, 656),
	],
	supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Byzantium),
};
