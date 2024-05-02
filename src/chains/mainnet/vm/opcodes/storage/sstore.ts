import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
	OpcodeGroup,
	ethSpecsOpcodeSrc,
	evmCodesOpcodesLink,
	evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import type { Opcode } from '@/types';

export const sstore: Opcode = {
	number: 0x55,
	name: 'sstore',
	description: 'Save word to storage',
	minGas: 100,
	gasComputation: {
		staticGasCost: {
			expression: '0',
		},
		dynamicGasCost: {
			// TODO: find a way to better define this expression.
			expression: `
if value == current_value
  if key is warm
    base_dynamic_gas = 100
  else
    base_dynamic_gas = 100
else if current_value == original_value
  if original_value == 0
    base_dynamic_gas = 20000
  else
    base_dynamic_gas = 2900
else
  base_dynamic_gas = 100

if slot is cold
  base_dynamic_gas += 2100
      `,
			variables: [
				{
					name: 'value',
					description: 'The value from the stack input',
				},
				{
					name: 'current_value',
					description: 'The current value of the storage slot',
				},
				{
					name: 'original_value',
					description: 'The value of the storage slot before the current transaction',
				},
			],
		},
		// TODO: find a way to better define this expression.
		refunds: `
if value != current_value
  if current_value == original_value
    if original_value != 0 and value == 0
        gas_refunds += 4800
  else
    if original_value != 0
      if current_value == 0
        gas_refunds -= 4800
      else if value == 0
        gas_refunds += 4800
    if value == original_value
      if original_value == 0
        if key is warm
          gas_refunds += 20000 - 100
        else
          gas_refunds += 19900
      else
        if key is warm
          gas_refunds += 5000 - 2100 - 100
        else
          gas_refunds += 4900
    `,
	},
	inputs: [
		{
			name: 'key',
			description: 'The 32-byte key in storage',
		},
		{
			name: 'value',
			description: 'The 32-byte value to store',
		},
	],
	examples: [
		{
			input: ['0', '0xFFFF'],
			storage: {
				before: {},
				after: {
					'0': '0xFFFF',
				},
			},
		},
		{
			input: ['8965', '0xFF'],
			storage: {
				before: {
					'0': '0xFFFF',
				},
				after: {
					'0': '0xFFFF',
					'8965': '0xFF',
				},
			},
		},
	],
	playgroundLink: evmCodesPlaygroundLink(
		'%27z1uFFv1%200w~z2uy8965w%27~%5Cnz%2F%2F%20Example%20yv2%20w~SSTORE~v~PUSHuy0xFF%01uvwyz~_',
	),
	errorCases: [
		'Not enough gas',
		'Not enough values on the stack',
		'The current execution context is from a STATICCALL (since Byzantium fork)',
	],
	references: [
		evmCodesOpcodesLink(0x55),
		ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Storage, 62),
	],
	supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
