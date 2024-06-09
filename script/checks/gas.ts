import { type Address, type PublicClient, type EstimateGasParameters, parseEther } from 'viem';

const from: Address = '0xA1A1a1a1A1A1A1A1A1a1a1a1a1a1A1A1a1A1a1a1';

type CallError = { details: string };
type GasBenchmark = {
	name: string;
	expectedGasEstimate: bigint;
	params: EstimateGasParameters;
};
export type GasBenchmarkResult = {
	name: string;
	expectedGas: bigint;
	gasEstimate: bigint | `Unknown (${string})`;
};

export async function checkGas(client: PublicClient): Promise<GasBenchmarkResult[]> {
	const result: GasBenchmarkResult[] = [];
	for (const benchmark of gasBenchmarks) {
		try {
			const gasEstimate = await client.estimateGas(benchmark.params);
			result.push({
				name: benchmark.name,
				expectedGas: benchmark.expectedGasEstimate,
				gasEstimate,
			});
		} catch (e: unknown) {
			const err = e as CallError;
			if (err.details.includes('too many arguments, want at most 2')) {
				// State overrides are not supported.
				result.push({
					name: benchmark.name,
					expectedGas: benchmark.expectedGasEstimate,
					gasEstimate: 'Unknown (state overrides not supported)',
				});
			} else {
				throw new Error(`Unexpected error: ${err}`);
			}
		}
	}
	return result;
}

export const gasBenchmarks: GasBenchmark[] = [
	{
		name: 'simple transfer',
		expectedGasEstimate: 21000n,
		params: {
			account: from,
			to: from,
			value: parseEther('1'),
			stateOverride: [{ address: from, balance: parseEther('1') }],
		},
	},
];
