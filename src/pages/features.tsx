import { useRouter } from 'next/router';
import { ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import { FeatureTable } from '@/components/features/FeatureTable';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { FeatureDiffSelector } from '@/components/FeatureDiffSelector';
import { featureMap } from '@/lib/constants';

const LoadingDiv = () => (
	<div className="text-center">
		<LoadingSpinner />
		<h1 className="text-secondary text-md tracking-wide mt-4">Fetching Data...</h1>
	</div>
);

const ErrorDiv = () => (
	<main className="text-center">
		<h1 className="text-primary text-3xl font-bold tracking-tight sm:text-5xl">Oops!</h1>
		<p className="text-secondary mt-6 text-base leading-7">
			Invalid feature provided, please try again below.
		</p>
		<div className="mx-auto mt-10 flex max-w-md gap-x-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
			<FeatureDiffSelector />
		</div>
	</main>
);

const Features = () => {
	const router = useRouter();
	const { feature } = router.query;

	const onBack = (e: React.MouseEvent) => {
		e.preventDefault();
		router.push({ pathname: '/' });
	};

	if (!router.isReady) return <LoadingDiv />;
	if (!((feature as string) in featureMap)) return <ErrorDiv />;

	return (
		<main>
			<h2 className="mx-auto max-w-2xl text-center text-3xl font-bold tracking-tight text-zinc-1000 dark:text-zinc-0 sm:text-4xl">
				{featureMap[feature as keyof typeof featureMap].title} Comparison
			</h2>

			<div className="flex flex-col items-center">
				<div className="mt-8 max-w-screen-lg">
					<button
						onClick={onBack}
						className="mb-4 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
					>
						<ArrowLeftIcon width="1.1rem" className="mr-1 inline-block" /> Back
					</button>

					<p className="text-secondary mb-2 text-sm">
						<ExclamationTriangleIcon width="1rem" className="mr-2 inline-block text-amber-500" />
						There may still be diffs between chains with the same support level. For example, an
						opcode may behave differently between chains. Be sure to read a chain&apos;s
						documentation to learn more.
					</p>
					<FeatureTable feature={feature as string} featureMap={featureMap} className="w-full" />
				</div>
			</div>
		</main>
	);
};

export default Features;
