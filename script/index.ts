import type { Metadata } from './types';

function init() {
	const arg = process.argv[2];
	if (!arg) throw new Error('Must provide chainId as an argument');
	const chainId = Number(arg);
	if (Number.isNaN(chainId)) throw new Error('chainId must be a number');
	if (chainId > 0 && chainId < Number.MAX_SAFE_INTEGER) throw new Error('chainId not supported');
	return { chainId };
}

async function getMetadata(chainId: number): Promise<Metadata> {
	const response = await fetch('https://chainid.network/chains.json');
	const data = await response.json();
	const metadata = data.find((chain: Metadata) => chain.chainId === chainId);
	if (!metadata) throw new Error(`Chain with ID ${chainId} not found.`);
	return metadata;
}

async function save(chainId: number, chainObj: object) {
	await Bun.write(`data/${chainId}.json`, JSON.stringify(chainObj));
	console.log(`✅ Chain data for chainId ${chainId} written to data/${chainId}.json`);
}

async function main() {
	const { chainId } = init();
	const metadata = await getMetadata(chainId);
	const chain = { metadata };
	await save(chainId, chain);
}

main().catch((error) => {
	console.error('An error occurred:', error);
	process.exit(1);
});
