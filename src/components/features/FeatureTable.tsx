import { useState, useEffect } from 'react';
import type { Chain } from '@/../script/index';
import { classNames } from '@/lib/utils';
import { ExternalLink } from '@/components/layout/ExternalLink';
import { toUppercaseHex } from '@/lib/utils';

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
// opcodes: done
// deployedContracts: TODO
// precompiles: TODO
// predeploys: TODO
// evmStackAddresses: TODO

const tbodyClasses = 'divide-y divide-zinc-200 dark:divide-zinc-600';
const trClasses = 'bg-secondary group';
const td1Classes = 'text-primary text-center py-2 text-sm font-medium';
const td2Classes = 'text-primary px-3 py-4 text-center text-sm';
const supportedClasses = 'bg-green-100/80 dark:bg-green-900/60';
const unsupportedClasses = 'bg-red-100 dark:bg-red-900/80';

const MetadataTable = ({ featureData }: { featureData: Record<string, Metadata> }) => {
	return (
		<tbody className={tbodyClasses}>
			{/* Chain ID */}
			<tr className={trClasses}>
				<td className={td1Classes}>Chain ID</td>
				{Object.keys(featureData).map((chainId) => (
					<td key={chainId} className={td2Classes}>
						{featureData[chainId].chainId}
					</td>
				))}
			</tr>
			{/* Native Currency */}
			<tr className={trClasses}>
				<td className={td1Classes}>Native Currency</td>
				{Object.keys(featureData).map((chainId) => (
					<td key={chainId} className={td2Classes}>
						{`${featureData[chainId].nativeCurrency.name} (${featureData[chainId].nativeCurrency.symbol})`}
					</td>
				))}
			</tr>
			{/* Block Explorers */}
			<tr className={trClasses}>
				<td className={td1Classes}>Block Explorers</td>
				{Object.keys(featureData).map((chainId) => (
					<td key={chainId} className={td2Classes}>
						{featureData[chainId].explorers?.map((explorer) => (
							<div key={explorer.name}>
								<ExternalLink href={explorer.url} text={explorer.url} />
							</div>
						))}
					</td>
				))}
			</tr>
		</tbody>
	);
};

const OpcodesTable = ({ featureData }: { featureData: Record<string, Opcodes> }) => {
	return (
		<tbody className={tbodyClasses}>
			{featureData['1'].map((op) => (
				<tr key={op.number} className={trClasses}>
					<td className={td1Classes}>
						{op.name}
						<div className="text-secondary text-sm">{toUppercaseHex(Number(op.number))}</div>
					</td>
					{Object.keys(featureData).map((chainId) => {
						const opcode = featureData[chainId].find((opcode) => opcode.number === op.number);
						const bgColor = opcode
							? opcode.supported
								? supportedClasses
								: unsupportedClasses
							: '';
						return (
							<td key={chainId} className={classNames(td2Classes, bgColor)}>
								{opcode ? (opcode.supported ? 'Yes' : 'No') : 'Unknown'}
							</td>
						);
					})}
				</tr>
			))}
		</tbody>
	);
};

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
				const metadataUrl =
					'https://raw.githubusercontent.com/mds1/evm-diff/refactor/automated/script/data/feature/metadata.json';
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

	const renderTableBody = () => {
		switch (feature) {
			case 'metadata':
				return <MetadataTable featureData={featureData as Record<string, Metadata>} />;
			case 'opcodes':
				return <OpcodesTable featureData={featureData as Record<string, Opcodes>} />;
			// case 'deployedContracts':
			// 	return <DeployedContractsTable featureData={featureData as Record<string, DeployedContracts>} metadata={metadata} />;
			// case 'precompiles':
			// 	return <PrecompilesTable featureData={featureData as Record<string, Precompiles>} metadata={metadata} />;
			// case 'evmStackAddresses':
			// 	return <EvmStackAddressesTable featureData={featureData as Record<string, EvmStackAddresses>} metadata={metadata} />;
			default:
				return null;
		}
	};

	return (
		<div className={className}>
			<div className="overflow-hidden rounded-md border border-zinc-300 shadow-sm dark:border-zinc-600 dark:shadow-md">
				<div className="overflow-y-auto max-h-screen">
					<table className="inline-block w-full">
						<thead>
							<tr>
								<th
									scope="col"
									className="text-primary text-center sticky top-0 py-3.5 px-2 text-sm font-semibold bg-white dark:bg-zinc-800"
								>
									<div className="group inline-flex rounded-md p-1">
										{feature === 'metadata' ? 'Property' : featureMap[feature].title.slice(0, -1)}
									</div>
								</th>
								{Object.keys(featureData).map((chainId) => {
									return (
										<th
											key={chainId}
											scope="col"
											className="text-primary sticky top-0 text-center px-3 py-3.5 text-sm font-semibold bg-white dark:bg-zinc-800"
										>
											<div className="group inline-flex rounded-md p-1">
												{metadata[chainId].name}
											</div>
										</th>
									);
								})}
							</tr>
						</thead>
						{renderTableBody()}
					</table>
				</div>
			</div>
		</div>
	);
};
