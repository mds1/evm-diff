// Given an Etherscan URL, fetch the ABI and convert it to viem's human readable format.
// Example usage:
//   bun script/fetch-abi.ts https://arbiscan.io/address/0x0000000000000000000000000000000000000064
import { formatAbi } from 'abitype';
import clipboardy from 'clipboardy';
import type { Address } from 'viem';

type ChainConfig = {
	name: string;
	urlPart: string;
	apiPrefix: string;
	apiKey: string;
};

const chains: Record<string, ChainConfig> = {
	arbitrum: {
		name: 'Arbitrum',
		urlPart: 'arbiscan.io',
		apiPrefix: 'api.',
		apiKey: process.env.ARBISCAN_API_KEY!,
	},
	optimism: {
		name: 'Optimism',
		urlPart: 'optimistic.etherscan.io',
		apiPrefix: 'api-',
		apiKey: process.env.OPTIMISM_API_KEY!,
	},
};

async function getAbi(apiUrl: string) {
	// Fetch the ABI from the API.
	const response = await fetch(apiUrl);
	const data = await response.json();
	if (data.status !== '1') throw new Error('API request failed: ' + data.message);

	// Return formatted ABI.
	const abi = JSON.parse(data.result);
	return formatAbi(abi);
}

function getChain(url: string): ChainConfig {
	for (const chainName in chains) {
		if (url.includes(chains[chainName].urlPart)) {
			const chain = chains[chainName];
			if (!chain.apiKey) throw new Error(`API key not found for chain ${chainName}`);
			return chain;
		}
	}
	throw new Error(`Chain not recognized from URL: ${url}`);
}

function getEtherscanUrl(chain: ChainConfig, address: Address, kind: 'abi' | 'source') {
	const query = kind === 'abi' ? 'getabi' : 'getsourcecode';
	const { apiPrefix, apiKey, urlPart } = chain;
	return `https://${apiPrefix}${urlPart}/api?module=contract&action=${query}&address=${address}&apikey=${apiKey}`;
}

async function main() {
	// Use the first argument as the URL and get the contract address from it.
	const url = process.argv[2];
	if (!url) throw new Error('URL is required');

	// Get the address and chain from the URL.
	const address = url.split('/').pop() as Address;
	if (!address) throw new Error('Could not parse address from URL');
	const chain = getChain(url);

	// Get the ABI.
	const abiRequestUrl = getEtherscanUrl(chain, address, 'abi');
	const formattedAbi1 = await getAbi(abiRequestUrl);

	// Now we check if it's a proxy contract.
	// Note that for some optimism predeploys that are proxies, this does not return the
	// implementation address, so it's not guaranteed to work.
	const sourceRequestUrl = getEtherscanUrl(chain, address, 'source');
	const sourceResponse = await fetch(sourceRequestUrl);
	const data = await sourceResponse.json();
	if (data.status !== '1') throw new Error('API request failed: ' + data.message);
	const implementationAddress = data.result[0].Implementation as '' | Address;

	// If it is a proxy contract, fetch the implementation ABI.
	let formattedAbi2;
	if (implementationAddress) {
		const implAbiRequestUrl = getEtherscanUrl(chain, implementationAddress, 'abi');
		formattedAbi2 = await getAbi(implAbiRequestUrl);
	}

	// If we have a second ABI, separate the two with a divider so they can be easily distinguished.
	const fullAbi = formattedAbi2 ? formattedAbi1.concat('--------', formattedAbi2) : formattedAbi1;

	// Copy the formatted ABI to the clipboard.
	clipboardy.writeSync(JSON.stringify(fullAbi));
	const kind = formattedAbi2 ? ' proxy and implementation ' : ' ';
	console.log(`✅ Copied${kind}ABI to clipboard for ${chain.name} contract ${address}`);
}

main().catch(console.error);
