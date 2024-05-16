import Link from 'next/link';
import { useRouter } from 'next/router';
import { ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { FeatureTable } from '@/components/features/FeatureTable';

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

	const onBack = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push({ pathname: '/' });
	};

	return (
		<main>
			<h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-zinc-1000 dark:text-zinc-0 sm:text-4xl">
				Comparison of {featureMap[feature as keyof typeof featureMap].title}
			</h2>

			<div className="flex flex-col items-center">
				<div className="mt-8 max-w-screen-lg">
					<button
						onClick={onBack}
						className="mb-4 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
					>
						<ArrowLeftIcon width="1.1rem" className="mr-1 inline-block" /> Back
					</button>

					<FeatureTable feature={feature as string} featureMap={featureMap} className="w-full" />
				</div>

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

export default Features;
