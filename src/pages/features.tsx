import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { FeatureTable } from '@/components/features/FeatureTable';
import { BaseCombobox } from '@/components/ui/BaseCombobox';
import features from '@/lib/features.json';

interface Section {
	title: string;
	infoText?: string;
}

const featureMap: Record<string, Section> = {
	metadata: { title: 'Metadata' },
	opcodes: {
		title: 'Opcodes',
		infoText: 'Whether or not standard opcodes are supported.',
	},
	deployedContracts: {
		title: 'Deployed Contracts',
		infoText: 'Whether common utility contracts used by developers and users exist.',
	},
	precompiles: {
		title: 'Precompiles',
		infoText: 'Whether or not standard precompiles are supported.',
	},
	evmStackAddresses: {
		title: 'EVM Stack Addresses',
		infoText:
			'Existence of "stack-specific" accounts on a chain, to determine what kind of chain it is. If an account exists on both chains but shows up in the diff, it indicates the code hash is different. This does not necessarily mean the contract is different.',
	},
};

const Features = () => {
	// --- URL Parsing ---
	const router = useRouter();
	const { feature } = router.query;

	// --- Prepare options ---
	const options = features.map(({ feature }) => ({
		key: feature,
		name: featureMap[feature as keyof typeof featureMap].title,
	}));

	// --- Form handling ---
	// Set PUSH0 as the default.
	const opcodeIndex = options.findIndex((opt) => opt.name === 'Opcodes');
	const [option, setOption] = useState(options[opcodeIndex]);

	const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		router.push({
			pathname: '/features',
			query: { feature: option.key },
		});
	};

	// --- Selector Div ---
	const SelectorDiv = () => (
		<main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
			<div className="relative isolate overflow-hidden px-6 py-0 sm:rounded-3xl sm:px-24 sm:py-20">
				<h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-zinc-1000 dark:text-zinc-0 sm:text-4xl">
					Compare Support Across Chains
				</h2>
				<p className="text-secondary mx-auto mt-2 max-w-prose text-center text-lg leading-8">
					Choose a feature or property and check its support across chains.
				</p>
				<form className="mx-auto mt-6 max-w-md space-y-6" onSubmit={onSubmit}>
					<BaseCombobox
						label="Select feature"
						options={options}
						value={option}
						onChange={setOption}
					/>
					<button type="submit" className="button flex w-full justify-center">
						Compare
					</button>
				</form>
			</div>
		</main>
	);

	// --- Feature Table ---
	const FeatureTableDiv = () => {
		return (
			<main>
				<h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-zinc-1000 dark:text-zinc-0 sm:text-4xl">
					Comparison of {featureMap[feature as keyof typeof featureMap].title}
				</h2>
				<div className="flex flex-col items-center">
					<FeatureTable
						feature={feature as string}
						featureMap={featureMap}
						className="mt-8 max-w-prose"
					/>
					<p className="text-secondary mx-auto mt-4 max-w-sm text-sm">
						<ExclamationTriangleIcon width="1rem" className="mr-2 inline-block text-amber-500" />
						There may still be diffs between chains with the same support level. Be sure to{' '}
						<Link className="hyperlink" href="/">
							view a diff
						</Link>{' '}
						of specific chains to see details.
					</p>
				</div>
			</main>
		);
	};

	// --- Render ---
	return <>{feature ? <FeatureTableDiv /> : <SelectorDiv />}</>;
};

export default Features;
