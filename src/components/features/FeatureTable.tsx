import { useState, useEffect } from 'react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import type { Chain } from '@/../script/index';
import { classNames } from '@/lib/utils';

type Metadata = Chain['metadata'];
type Opcodes = Chain['opcodes'];
type DeployedContracts = Chain['deployedContracts'];
type Precompiles = Chain['precompiles'];
type EvmStackAddresses = Chain['evmStackAddresses'];

interface Section {
	title: string;
	infoText?: string;
}

// metadata: TODO
// opcodes: TODO
// deployedContracts: TODO
// precompiles: TODO
// predeploys: TODO
// evmStackAddresses: TODO

export const FeatureTable = ({
	feature,
	featureMap,
	className,
}: { feature: string; featureMap: Record<string, Section>; className?: string }) => {
	const [metadata, setMetadata] = useState<Record<string, Metadata> | null>(null);
	const [featureData, setFeatureData] = useState<
		| Record<string, Metadata>
		| Record<string, Opcodes>
		| Record<string, DeployedContracts>
		| Record<string, Precompiles>
		| Record<string, EvmStackAddresses>
		| null
	>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const metadataUrl = `https://raw.githubusercontent.com/mds1/evm-diff/refactor/automated/script/data/feature/metadata.json`;
				const metadataRes = await fetch(metadataUrl);
				const metadata = await metadataRes.json();
				setMetadata(metadata);

				const url = `https://raw.githubusercontent.com/mds1/evm-diff/refactor/automated/script/data/feature/${feature}.json`;
				const res = await fetch(url);
				const featureData = await res.json();
				setFeatureData(featureData);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, [feature]);

	if (!metadata || !featureData) return null;

	return (
		<div className={className}>
			<div className="overflow-hidden rounded-md border border-zinc-300 shadow-sm dark:border-zinc-600 dark:shadow-md">
				<div className="overflow-y-auto max-h-screen">
					<table className="inline-block w-full">
						<thead>
							<tr>
								<th
									scope="col"
									className="text-primary sticky top-0 py-3.5 pl-4 pr-3 text-left text-sm font-semibold sm:pl-6 bg-white dark:bg-zinc-800"
								>
									<div className="group inline-flex rounded-md p-1 hover:bg-zinc-200 hover:dark:bg-zinc-700">
										{featureMap[feature].title.slice(0, -1)}
									</div>
								</th>
								{Object.keys(featureData).map((chainId) => {
									return (
										<th
											key={chainId}
											scope="col"
											className="text-primary sticky top-0 text-center px-3 py-3.5 text-sm font-semibold bg-white dark:bg-zinc-800"
										>
											<div className="group inline-flex rounded-md p-1 hover:bg-zinc-200 hover:dark:bg-zinc-700">
												{metadata[chainId].name}
											</div>
										</th>
									);
								})}
							</tr>
						</thead>
						<tbody className="divide-y divide-zinc-200 dark:divide-zinc-600">
							{featureData['1' /* mainnet as source of truth for known opcodes */].map((op) => (
								<tr key={op.number} className="bg-secondary group">
									<td className="text-primary flex flex-col whitespace-nowrap py-2 pl-4 pr-3 text-sm font-medium sm:pl-6">
										{op.name}
										<div className="text-secondary text-sm">{op.number}</div>
									</td>
									{Object.keys(featureData).map((chainId) => {
										const opcode = featureData[chainId].find(
											(opcode) => opcode.number === op.number,
										);
										const bgColor = opcode
											? opcode.supported
												? 'bg-green-100/80 dark:bg-green-900/60'
												: 'bg-red-100 dark:bg-red-900/80'
											: '';
										return (
											<td
												key={chainId}
												className={classNames(
													'text-primary whitespace-nowrap px-3 py-4 text-center text-sm',
													bgColor,
												)}
											>
												{opcode ? (opcode.supported ? 'Yes' : 'No') : 'Unknown'}
											</td>
										);
									})}
								</tr>
							))}
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};
