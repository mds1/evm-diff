import { http, fallback, createPublicClient } from 'viem';
import { checkDeployedContracts } from './checks/deployed-contracts';
import {
	checkEvmStackAddresses,
	type EVMStack,
	type EVMStackResult,
} from './checks/evm-stack-addresses';
import { checkOpcodes } from './checks/opcodes';
import { checkPrecompiles } from './checks/precompiles';
import { createRetryClient } from './checks/utils';
import type { Metadata } from './types';
import { join } from 'node:path';

export type Chain = {
	metadata: Metadata;
	opcodes: {
		number: `0x${string}`;
		name: string;
		supported: string | boolean;
	}[];
	deployedContracts: {
		name: string;
		address: `0x${string}`;
		codeHash: `0x${string}`;
		hasCode: boolean;
	}[];
	precompiles: {
		name: string;
		address: `0x${string}`;
		implemented: boolean;
	}[];
	evmStackAddresses: Record<EVMStack, EVMStackResult[]>;
};

async function main() {
	// Initialize chain data.
	const { chainId } = init();
	const metadata = await getMetadata(chainId);
	const rpcUrls = selectRpcUrls(metadata.rpc);
	const client = initClient(rpcUrls);

	// Fetch data.
	const [opcodes, deployedContracts, precompiles, evmStackAddresses] = await Promise.all([
		checkOpcodes(client),
		checkDeployedContracts(client),
		checkPrecompiles(client),
		checkEvmStackAddresses(client),
	]);

	// Format and save the output.
	const chain: Chain = {
		metadata: sortObjectKeys(metadata, [
			'name',
			'shortName',
			'chainId',
			'networkId',
			'infoURL',
			'nativeCurrency',
		]),
		opcodes,
		deployedContracts,
		precompiles,
		evmStackAddresses,
	};
	await save(chainId, chain);
}

function init() {
	const arg = process.argv[2];
	if (!arg) throw new Error('Must provide chainId as an argument');
	const chainId = Number(arg);
	if (Number.isNaN(chainId)) throw new Error('chainId must be a number');
	if (chainId <= 0 || chainId > Number.MAX_SAFE_INTEGER) throw new Error('chainId not supported');
	return { chainId };
}

function initClient(rpcUrls: string[]) {
	// Websocket seems to hang and script doesn't exit, so we only use HTTP.
	const https = rpcUrls.filter((url) => url.startsWith('https')).map((url) => http(url));
	const transport = fallback([...https]);
	return createRetryClient(createPublicClient({ transport }));
}

async function getMetadata(chainId: number): Promise<Metadata> {
	const response = await fetch('https://chainid.network/chains.json');
	const data = await response.json();
	const metadata = data.find((chain: Metadata) => chain.chainId === chainId);
	if (!metadata) throw new Error(`Chain with ID ${chainId} not found.`);

	// Add in the custom RPC URLs from input.json.
	const chains = await Bun.file('script/input.json').json();
	const chain = chains.find((chain: Metadata) => chain.chainId === chainId);
	if (chain?.rpcUrls) metadata.rpc.push(...chain.rpcUrls);
	metadata.rpc = [...new Set(metadata.rpc)]; // Deduplicate RPC URLs.

	return metadata;
}

async function save(chainId: number, chainObj: object) {
	const outfile = join(import.meta.dir, 'data', 'chain', `${chainId}.json`);
	await Bun.write(outfile, JSON.stringify(chainObj));
	console.log(`✅ Chain data for chainId ${chainId} written to script/data/${chainId}.json`);
}

function sortObjectKeys<T extends object>(obj: T, orderedKeys: (keyof T)[]): T {
	const objKeys = Object.keys(obj) as (keyof T)[];
	const remainingKeys = objKeys.filter((key) => !orderedKeys.includes(key));
	const sortedRemainingKeys = remainingKeys.sort((keyA, keyB) =>
		String(keyA).localeCompare(String(keyB)),
	);
	const sortedKeys = [...orderedKeys, ...sortedRemainingKeys];
	const sortedEntries = sortedKeys.map((key) => [key, obj[key]]);
	return Object.fromEntries(sortedEntries) as T;
}

function selectRpcUrls(rpcUrls: string[]): string[] {
	const hasPlaceholder = (str: string): boolean => str.includes('${');

	const replacePlaceholder = (str: string): string => {
		const placeholderRegex = /\$\{(\w+)\}/;
		const match = str.match(placeholderRegex);
		if (match) {
			const apiKey = process.env[match[1]];
			if (apiKey) return str.replace(placeholderRegex, apiKey);
		}
		return str;
	};

	// These domains have various issues that make them unsuitable for our purposes.
	const domainsToSkip = [
		'drpc.org', // Required "to" is empty.
		'blocknative.com', // Transaction creation failed.
		'flashbots.net', // 403 (also on eth_call with no to).
		'mevblocker.io', // 429's easily.
		'matic-mainnet-full-rpc.bwarelabs.com', // "This endpoint is deprecated".
		'publicnode.com', // Transaction creation failed.
		'cloudflare', // Requested resource not found.
		'api.avax.network', // Unrecognized token '<', 429's easily.
		'rpc.linea.build', // All error messages are identical so can't distinguish opcode support.
	];
	const filteredRpcUrls = rpcUrls.filter(
		(url) => !domainsToSkip.some((domain) => url.includes(domain)),
	);

	// Check for URLs with placeholders and replace with API key if available. In this case, we
	// return this URL as the selected RPC URL. Preferring URLs with API keys this way helps
	// avoid rate limits and other issues.
	const replacedUrls: string[] = [];
	const normalUrls: string[] = [];
	for (const url of filteredRpcUrls) {
		if (hasPlaceholder(url)) {
			const replacedUrl = replacePlaceholder(url);
			if (replacedUrl !== url) replacedUrls.push(replacedUrl);
		} else {
			normalUrls.push(url);
		}
	}

	return [...replacedUrls, ...normalUrls]; // Prefer URLs with API keys.
}

main().catch((error) => {
	console.error('An error occurred:', error);
	process.exit(1);
});
