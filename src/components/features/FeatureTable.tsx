import { useState, useEffect } from 'react';
import type { Chain } from '@/../script/index';
import { classNames } from '@/lib/utils';
import { ExternalLink } from '@/components/layout/ExternalLink';
import { toUppercaseHex } from '@/lib/utils';
import { deployedContracts } from '@/../script/checks/deployed-contracts';
import { precompiles } from '@/../script/checks/precompiles';
import { Copyable } from '@/components/ui/Copyable';
import { evmStackAddresses, type EVMStackResult } from '@/../script/checks/evm-stack-addresses';
import { getAddress, type Address } from 'viem';

type Metadata = Chain['metadata'];
type Opcodes = Chain['opcodes'];
type DeployedContracts = Chain['deployedContracts'];
type Precompiles = Chain['precompiles'];
type EvmStackResults = Chain['evmStackAddresses'];

interface Section {
	title: string;
	infoText?: string;
}

const tbodyClasses = 'divide-y divide-zinc-200 dark:divide-zinc-600';
const trClasses = 'bg-secondary group';
const td1Classes = 'text-primary text-center p-2 text-sm font-medium';
const td2Classes = 'text-primary px-3 py-4 text-center text-sm';
const supportedClasses = 'bg-green-100/80 dark:bg-green-900/60';
const unsupportedClasses = 'bg-red-100 dark:bg-red-900/80';

// TODO Dedupe this helper method
const formatAddress = (addr: Address) => {
	const a = getAddress(addr);
	return <code>{`${a.slice(0, 6)}...${a.slice(-4)}`}</code>;
};

// TODO Dedupe this helper method
const formatStackHeader = (stack: keyof EvmStackResults) => {
	if (stack === 'OP') return 'OP Stack';
	if (stack === 'Orbit') return 'Orbit';
	return stack;
};

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

const DeployedContractsTable = ({
	featureData,
}: { featureData: Record<string, DeployedContracts> }) => {
	return (
		<tbody className={tbodyClasses}>
			{deployedContracts.map((contract) => (
				<tr key={contract.name} className={trClasses}>
					<td className={td1Classes}>
						<div className="text-left">{contract.name}</div>
						<Copyable
							className="text-secondary text-sm"
							content={formatAddress(contract.address)}
							textToCopy={getAddress(contract.address)}
						/>
					</td>
					{Object.keys(featureData).map((chainId) => {
						const contractData = featureData[chainId].find((c) => c.name === contract.name);
						const bgColor = contractData
							? contractData.hasCode
								? supportedClasses
								: unsupportedClasses
							: '';
						return (
							<td key={chainId} className={classNames(td2Classes, bgColor)}>
								{contractData ? (contractData.hasCode ? 'Yes' : 'No') : 'Unknown'}
							</td>
						);
					})}
				</tr>
			))}
		</tbody>
	);
};

const PrecompilesTable = ({ featureData }: { featureData: Record<string, Precompiles> }) => {
	return (
		<tbody className={tbodyClasses}>
			{precompiles.map((precompile) => (
				<tr key={precompile.name} className={trClasses}>
					<td className={td1Classes}>
						<div className="text-left">{precompile.name}</div>
						<Copyable
							className="text-secondary text-sm"
							content={formatAddress(precompile.address)}
							textToCopy={getAddress(precompile.address)}
						/>
					</td>
					{Object.keys(featureData).map((chainId) => {
						const precompileData = featureData[chainId].find((p) => p.name === precompile.name);
						const bgColor = precompileData
							? precompileData.implemented
								? supportedClasses
								: unsupportedClasses
							: '';
						return (
							<td key={chainId} className={classNames(td2Classes, bgColor)}>
								{precompileData ? (precompileData.implemented ? 'Yes' : 'No') : 'Unknown'}
							</td>
						);
					})}
				</tr>
			))}
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

const EvmStackAddressesTable = ({
	featureData,
}: { featureData: Record<string, EvmStackResults> }) => {
	const stacks = Object.keys(evmStackAddresses) as Array<keyof EvmStackResults>;
	return (
		<tbody className={tbodyClasses}>
			{stacks.map((stack) => {
				return evmStackAddresses[stack].map((account) => {
					return (
						<tr key={account.name} className={trClasses}>
							<td className={td1Classes}>
								<div className="text-left text-xs">{formatStackHeader(stack)}</div>
								<div className="text-left">{account.name}</div>
								<Copyable
									className="text-secondary text-sm"
									content={formatAddress(account.address)}
									textToCopy={getAddress(account.address)}
								/>
							</td>
							{Object.keys(featureData).map((chainId) => {
								const accountData = featureData[chainId][stack].find(
									(a: EVMStackResult) => a.name === account.name,
								);
								const bgColor = accountData
									? accountData.exists
										? supportedClasses
										: unsupportedClasses
									: '';
								return (
									<td key={chainId} className={classNames(td2Classes, bgColor)}>
										{accountData ? (accountData.exists ? 'Yes' : 'No') : 'Unknown'}
									</td>
								);
							})}
						</tr>
					);
				});
			})}
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
		| Record<string, EvmStackResults>
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
			case 'deployedContracts':
				return (
					<DeployedContractsTable featureData={featureData as Record<string, DeployedContracts>} />
				);
			case 'precompiles':
				return <PrecompilesTable featureData={featureData as Record<string, Precompiles>} />;
			case 'evmStackAddresses':
				return (
					<EvmStackAddressesTable featureData={featureData as Record<string, EvmStackResults>} />
				);
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
