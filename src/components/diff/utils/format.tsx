import { MainnetHardfork } from '@/chains/mainnet/hardforks';
import { CURRENT_OPTIMISM_HARDFORK, OptimismHardfork } from '@/chains/optimism/hardforks';
import { CURRENT_MAINNET_HARDFORK } from '@/lib/constants';

export const formatHardfork = (array: string[]): JSX.Element => {
	if (!array || array.length === 0) {
		return <p>No information provided on supported hard forks.</p>;
	}

	const first = array[0];
	const last = array[array.length - 1];
	const currentMainnetHardforkName = MainnetHardfork[CURRENT_MAINNET_HARDFORK];
	const currentOptimismHardforkName = OptimismHardfork[CURRENT_OPTIMISM_HARDFORK];
	if (array.length === 1) {
		const supportedText =
			first === currentMainnetHardforkName || first === currentOptimismHardforkName
				? `Supported since ${first} hard fork.`
				: `Supported only in ${first} hard fork.`;
		return (
			<p className="text-sm">
				<b>{supportedText}</b>
			</p>
		);
	}

	const supportedText =
		last === currentMainnetHardforkName || last === currentOptimismHardforkName
			? `Supported since ${first} hard fork.`
			: `Supported between ${first} and ${last} hard forks.`;
	return (
		<p className="text-sm">
			<b>{supportedText}</b>
		</p>
	);
};
