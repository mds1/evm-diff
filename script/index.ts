import { http, createPublicClient } from 'viem';
import { checkOpcodes } from './opcodes';
import type { Metadata } from './types';

async function main() {
	const { chainId } = init();
	const metadata = await getMetadata(chainId);
	const rpcUrl = selectRpcUrl(metadata.rpc);
	const client = initClient(rpcUrl);
	const opcodes = await checkOpcodes(client);
	const chain = {
		metadata: sortObjectKeys(metadata, [
			'name',
			'shortName',
			'chainId',
			'networkId',
			'infoURL',
			'nativeCurrency',
		]),
		opcodes,
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

function initClient(rpcUrl: string) {
	const transport = http(rpcUrl);
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
	await Bun.write(`data/chain/${chainId}.json`, JSON.stringify(chainObj));
	console.log(`✅ Chain data for chainId ${chainId} written to data/${chainId}.json`);
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

function selectRpcUrl(rpcUrls: string[]): string {
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

	// Check for URLs with placeholders and replace with API key if available. In this case, we
	// return this URL as the selected RPC URL. Preferring URLs with API keys this way helps
	// avoid rate limits and other issues.
	const httpUrls = rpcUrls.filter((url) => !url.startsWith('wss://'));
	for (const url of httpUrls) {
		if (hasPlaceholder(url)) {
			const replacedUrl = replacePlaceholder(url);
			if (replacedUrl !== url) return replacedUrl;
		}
	}

	// Otherwise, return the first URL that does not have a placeholder.
	return httpUrls.find((url) => !hasPlaceholder(url)) || '';
}

main().catch((error) => {
	console.error('An error occurred:', error);
	process.exit(1);
});
