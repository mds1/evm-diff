import { http, fallback, createPublicClient } from 'viem';
import { checkDeployedContracts } from './checks/deployed-contracts';
import {
	checkEvmStackAddresses,
	type EVMStack,
	type EVMStackResult,
} from './checks/evm-stack-addresses';
import { checkOpcodes } from './checks/opcodes';
import { checkPrecompiles } from './checks/precompiles';
import { checkGas, type GasBenchmarkResult } from './checks/gas';
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
	gas: GasBenchmarkResult[];
	evmStackAddresses: Record<EVMStack, EVMStackResult[]>;
};

async function main() {
	// Initialize chain data.
	const { chainId } = init();
	const metadata = await getMetadata(chainId);
	const rpcUrls = selectRpcUrls(metadata.rpc);
	const client = initClient(rpcUrls);

	// Fetch data.
	const [opcodes, deployedContracts, precompiles, gas, evmStackAddresses] = await Promise.all([
		checkOpcodes(client),
		checkDeployedContracts(client),
		checkPrecompiles(client),
		checkGas(client),
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
		gas,
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
	return createPublicClient({ transport });
}

async function getMetadata(chainId: number): Promise<Metadata> {
	const response = await fetch('https://chainid.network/chains.json');
	const data = await response.json();
	const metadata = data.find((chain: Metadata) => chain.chainId === chainId);
	if (!metadata) throw new Error(`Chain with ID ${chainId} not found.`);
	return metadata;
}

async function save(chainId: number, chainObj: object) {
	const outfile = join(import.meta.dir, 'data', 'chain', `${chainId}.json`);
	// Serialize BigInts as strings, since JSON.stringify doesn't support them natively.
	const stringifiedJSON = JSON.stringify(chainObj, (_, v) =>
		typeof v === 'bigint' ? v.toString() : v,
	);
	// TODO For some chains (notably Arbitrum chains), gas estimates vary between runs because they
	// are a function of L1 gas price. We must figure out a good way to handle this to avoid a
	// constantly changing diff. One option is to have the output JSON store the min and max gas
	// estimates seen, but this might mislead users into thinking that range is fixed. Additionally,
	// it enables frequent changes to the JSON file updating the min and max values, which isn't ideal.
	await Bun.write(outfile, stringifiedJSON);
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
