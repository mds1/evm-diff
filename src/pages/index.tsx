import { ChainDiffSelector } from '@/components/ChainDiffSelector';
import { FeatureDiffSelector } from '@/components/FeatureDiffSelector';

const Home = () => {
	return (
		<>
			<main className="mx-auto max-w-7xl sm:px-6 lg:px-8">
				<div className="relative isolate overflow-hidden px-6 py-0 sm:rounded-3xl sm:px-24 sm:py-20">
					<div className="flex flex-col gap-8 md:flex-row md:justify-around">
						<div className="md:w-1/2">
							<div className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-zinc-1000 dark:text-zinc-0 sm:text-4xl">
								Diff Two Chains
							</div>
							<p className="text-secondary mx-auto mt-2 max-w-xl text-center text-lg leading-8">
								Compare all execution layer differences between chains in a friendly format
							</p>
							<div className="mx-auto mt-10 flex max-w-md gap-x-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
								<ChainDiffSelector />
							</div>
						</div>
						<div className="md:w-1/2">
							<div className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-zinc-1000 dark:text-zinc-0 sm:text-4xl">
								Compare Across Chains
							</div>
							<p className="text-secondary mx-auto mt-2 max-w-prose text-center text-lg leading-8">
								Choose a feature or property and check its support across chains.
							</p>
							<div className="mx-auto mt-10 flex max-w-md gap-x-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
								<FeatureDiffSelector />
							</div>
						</div>
					</div>
				</div>
			</main>
		</>
	);
};

export default Home;
