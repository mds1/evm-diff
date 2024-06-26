import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LinkIcon, ArrowLeftIcon, ExclamationTriangleIcon } from '@heroicons/react/20/solid';
import type { Chain } from '@/../script/index';
import { ChainDiffSelector } from '@/components/ChainDiffSelector';
import { DiffDeployedContracts } from '@/components/diff/DiffDeployedContracts';
import { DiffEVMStackAddresses } from '@/components/diff/DiffEVMStackAddresses';
import { DiffJSON } from '@/components/diff/DiffJSON';
import { DiffMetadata } from '@/components/diff/DiffMetadata';
import { DiffOpcodes } from '@/components/diff/DiffOpcodes';
import { DiffPrecompiles } from '@/components/diff/DiffPrecompiles';
import { Copyable } from '@/components/ui/Copyable';
import { Toggle } from '@/components/ui/Toggle';
import { chainLogoUrl } from '@/lib/utils';
import Image from 'next/image';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import { BASE_DATA_URL, featureMap } from '@/lib/constants';

interface Props<T> {
	base: T;
	target: T;
	onlyShowDiff: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const componentMap: Record<string, React.ComponentType<Props<any>>> = {
	metadata: DiffMetadata,
	opcodes: DiffOpcodes,
	deployedContracts: DiffDeployedContracts,
	precompiles: DiffPrecompiles,
	evmStackAddresses: DiffEVMStackAddresses,
	// signatureTypes:  DiffSignatureTypes ,
};

const Diff = () => {
	// -------- Parse query parameters --------
	const router = useRouter();
	const {
		base,
		target,
		onlyShowDiff: onlyShowDiffParam,
		showPrettyDiff: showPrettyDiffParam,
	} = router.query;

	const [loading, setLoading] = useState(true);
	const [baseChain, setBaseChain] = useState(null);
	const [targetChain, setTargetChain] = useState(null);
	const [onlyShowDiff, setOnlyShowDiff] = useState(true);
	const [showPrettyDiff, setShowPrettyDiff] = useState(true);

	useEffect(() => {
		if (!base || !target) {
			setLoading(false);
			return;
		}

		if (onlyShowDiffParam !== undefined) setOnlyShowDiff(onlyShowDiffParam === 'true');
		if (showPrettyDiffParam !== undefined) setShowPrettyDiff(showPrettyDiffParam === 'true');

		const fetchData = async () => {
			try {
				const urls = [
					`${BASE_DATA_URL}/chain/${base}.json`,
					`${BASE_DATA_URL}/chain/${target}.json`,
				];

				const chainData = await Promise.all(
					urls.map(async (url) => {
						const response = await fetch(url);
						return response.json();
					}),
				);

				setBaseChain(chainData[0]);
				setTargetChain(chainData[1]);
				setLoading(false);
			} catch (error) {
				console.error('Error fetching data:', error);
				setLoading(false);
			}
		};

		fetchData();
	}, [base, target, onlyShowDiffParam, showPrettyDiffParam]);

	const ErrorDiv = () => (
		<main className="text-center">
			<h1 className="text-primary text-3xl font-bold tracking-tight sm:text-5xl">Oops!</h1>
			<p className="text-secondary mt-6 text-base leading-7">
				Invalid chain(s) provided, please try again below.
			</p>
			<div className="mx-auto mt-10 flex max-w-md gap-x-4 rounded-lg border border-zinc-200 dark:border-zinc-700">
				<ChainDiffSelector />
			</div>
		</main>
	);

	const LoadingDiv = () => (
		<main className="text-center">
			<LoadingSpinner />
			<h1 className="text-secondary text-md tracking-wide mt-4">Fetching Data...</h1>
		</main>
	);

	// -------- Show diff --------
	const SectionComponent = ({
		section,
		base,
		target,
		onlyShowDiff,
	}: {
		section: string;
		base: Chain[keyof Chain];
		target: Chain[keyof Chain];
		onlyShowDiff: boolean;
	}) => {
		// if (!SECTION_MAP[section]) return <></>;
		const Component = componentMap[section];
		return <Component {...{ base, target, onlyShowDiff }} />;
	};

	// We take `baseChain` and `targetChain` as arguments to ensure that they are not `undefined`
	// and remove the need for `?` and `!` operators.
	const DiffDiv = ({ baseChain, targetChain }: { baseChain: Chain; targetChain: Chain }) => {
		const sections = Object.keys(featureMap);
		const onBack = (e: React.MouseEvent) => {
			e.preventDefault();
			router.push({ pathname: '/' });
		};

		return (
			<>
				<main>
					<button
						onClick={onBack}
						className="mb-2 text-zinc-600 dark:text-zinc-400 hover:text-zinc-800 dark:hover:text-zinc-200"
					>
						<ArrowLeftIcon width="1.1rem" className="mr-1 inline-block" /> Back
					</button>
					<div className="border border-zinc-200 rounded-md p-4 bg-zinc-100 shadow-sm dark:bg-zinc-800 dark:border-zinc-700">
						<div className="flex space-x-8">
							<Toggle
								enabled={onlyShowDiff}
								setEnabled={setOnlyShowDiff}
								enabledText="Show Diff"
								disabledText="Show All"
								queryParamName="onlyShowDiff"
							/>
							<Toggle
								enabled={showPrettyDiff}
								setEnabled={setShowPrettyDiff}
								enabledText="Formatted"
								disabledText="JSON Diff"
								queryParamName="showPrettyDiff"
							/>
						</div>
					</div>
					<p className="text-secondary my-1 text-sm">
						<ExclamationTriangleIcon width="1rem" className="mr-2 inline-block text-amber-500" />
						There may still be diffs between chains with the same support level. For example, an
						opcode may behave differently between chains. Be sure to read a chain&apos;s
						documentation to learn more.
					</p>

					{/* Show chain names at top */}
					<div className="grid grid-cols-12 border-zinc-500/10 dark:border-zinc-500/20 sticky top-0 bg-zinc-50 dark:bg-zinc-900 z-10 p-4">
						<div className="col-span-2 text-left" />
						<div className="col-span-5 flex items-center space-x-2 text-lg font-bold">
							<Image
								src={chainLogoUrl({
									name: baseChain.metadata.name,
									chainId: baseChain.metadata.chainId,
								})}
								alt=""
								className="h-6 w-6 flex-shrink-0 rounded-full"
								width={24}
								height={24}
							/>
							<div>{baseChain.metadata.name}</div>
						</div>
						<div className="col-span-5 flex items-center space-x-2 text-lg font-bold">
							<Image
								src={chainLogoUrl({
									name: targetChain.metadata.name,
									chainId: targetChain.metadata.chainId,
								})}
								alt=""
								className="h-6 w-6 flex-shrink-0 rounded-full"
								width={24}
								height={24}
							/>
							<div>{targetChain.metadata.name}</div>
						</div>
					</div>

					{!showPrettyDiff && (
						<DiffJSON
							base={JSON.stringify(baseChain, null, 2)}
							target={JSON.stringify(targetChain, null, 2)}
							onlyShowDiff={onlyShowDiff}
						/>
					)}

					{/* Show content */}
					{showPrettyDiff &&
						sections.map((section) => {
							if (featureMap[section].hide) return null;
							const base = baseChain[section as keyof Chain];
							const target = targetChain[section as keyof Chain];
							return (
								<div key={section} id={section} className="mt-8">
									<div className="sticky top-12 bg-zinc-100 dark:bg-zinc-800 z-10 rounded-t-lg border border-b-0 border-zinc-200 dark:border-zinc-700">
										<div className="px-4 py-2">
											<Copyable
												content={featureMap[section].title || section}
												textToCopy={`${location.href.replace(location.hash, '')}#${section}`}
												Icon={LinkIcon}
												className="group relative flex w-max items-center text-xl font-bold leading-8 tracking-wide text-zinc-900 dark:text-zinc-100"
											/>
											<div className="text-secondary text-sm">{featureMap[section].infoText}</div>
										</div>
									</div>
									<div className="rounded-b-lg border border-t-1 border-zinc-200 dark:border-zinc-700 px-4">
										<SectionComponent {...{ section, base, target, onlyShowDiff }} />
									</div>
								</div>
							);
						})}
				</main>
			</>
		);
	};

	return (
		<div>
			{loading && <LoadingDiv />}
			{!loading && (!baseChain || !targetChain) && <ErrorDiv />}
			{!loading && baseChain && targetChain && (
				<DiffDiv baseChain={baseChain} targetChain={targetChain} />
			)}
		</div>
	);
};

export default Diff;
