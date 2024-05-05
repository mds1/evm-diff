import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { LinkIcon } from '@heroicons/react/20/solid';
import type { Chain } from '@/../script/index';
import { ChainDiffSelector } from '@/components/ChainDiffSelector';
import { DiffDeployedContracts } from '@/components/diff/DiffDeployedContracts';
import { DiffEVMStackAddresses } from '@/components/diff/DiffEVMStackAddresses';
import { DiffMetadata } from '@/components/diff/DiffMetadata';
import { DiffOpcodes } from '@/components/diff/DiffOpcodes';
import { DiffPrecompiles } from '@/components/diff/DiffPrecompiles';
import { Copyable } from '@/components/ui/Copyable';
import { Toggle } from '@/components/ui/Toggle';
import { classNames } from '@/lib/utils';

interface Props<T> {
	base: T;
	target: T;
	onlyShowDiff: boolean;
}

interface Section {
	title: string;
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	component: React.ComponentType<Props<any>>;
}

const SECTION_MAP: Record<string, Section> = {
	metadata: { title: 'Metadata', component: DiffMetadata },
	opcodes: { title: 'Opcodes', component: DiffOpcodes },
	deployedContracts: { title: 'Deployed Contracts', component: DiffDeployedContracts },
	precompiles: { title: 'Precompiles', component: DiffPrecompiles },
	evmStackAddresses: { title: 'EVM Stack Addresses', component: DiffEVMStackAddresses },
	// signatureTypes: { title: 'Transaction and Signature Types', component: DiffSignatureTypes },
	// accountTypes: { title: 'Account Types', component: DiffAccountTypes },
	// eips: { title: 'Execution EIPs', component: DiffEIPs },
	// executionNodes: { title: 'Execution Nodes', component: DiffNodes },
	// consensusNodes: { title: 'Consensus Nodes', component: DiffNodes, hide: true }, // Hidden to scope UI to execution data
};

const Diff = () => {
	// -------- Parse query parameters --------
	const router = useRouter();
	const { base, target } = router.query;

	const [baseChain, setBaseChain] = useState(null);
	const [targetChain, setTargetChain] = useState(null);

	useEffect(() => {
		if (!base || !target) return;
		const fetchData = async () => {
			try {
				const urls = [
					`https://raw.githubusercontent.com/mds1/evm-diff/refactor/automated/script/data/chain/${base}.json`,
					`https://raw.githubusercontent.com/mds1/evm-diff/refactor/automated/script/data/chain/${target}.json`,
				];

				const chainData = await Promise.all(
					urls.map(async (url) => {
						const response = await fetch(url);
						return response.json();
					}),
				);

				setBaseChain(chainData[0]);
				setTargetChain(chainData[1]);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [base, target]);

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

	// -------- Show diff --------

	const [onlyShowDiff, setOnlyShowDiff] = useState(true);

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
		const Component = SECTION_MAP[section].component;
		return <Component {...{ base, target, onlyShowDiff }} />;
	};

	// We take `baseChain` and `targetChain` as arguments to ensure that they are not `undefined`
	// and remove the need for `?` and `!` operators.
	const DiffDiv = ({ baseChain, targetChain }: { baseChain: Chain; targetChain: Chain }) => {
		const sections = Object.keys(SECTION_MAP);
		return (
			<>
				<main>
					<Toggle
						enabled={onlyShowDiff}
						setEnabled={setOnlyShowDiff}
						label="Only show differences"
					/>

					{/* Show chain names at top */}
					<div className="my-4 grid grid-cols-12 border-zinc-500/10 dark:border-zinc-500/20">
						<div className="col-span-2 text-left" />
						<div className="col-span-5">{baseChain.metadata.name}</div>
						<div className="col-span-5">{targetChain.metadata.name}</div>
					</div>

					{/* Show content */}
					{sections.map((section, index) => {
						const base = baseChain[section as keyof Chain];
						const target = targetChain[section as keyof Chain];
						return (
							<div key={section} id={section} className="break-words">
								{/* Header */}
								<Copyable
									content={SECTION_MAP[section].title || section}
									textToCopy={`${location.href.replace(location.hash, '')}#${section}`}
									Icon={LinkIcon}
									className={classNames(
										'text-2xl font-bold leading-10 tracking-wide',
										index === 0 ? 'mt-10' : 'mt-20',
									)}
								/>

								{/* Diff */}
								<SectionComponent {...{ section, base, target, onlyShowDiff }} />
							</div>
						);
					})}
				</main>
			</>
		);
	};

	return (
		<div>
			{(!baseChain || !targetChain) && <ErrorDiv />}
			{baseChain && targetChain && <DiffDiv baseChain={baseChain} targetChain={targetChain} />}
		</div>
	);
};

export default Diff;
