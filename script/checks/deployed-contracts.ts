import { type Address, type Hex, type PublicClient, keccak256 } from 'viem';

const NO_CODE_HASH = keccak256('0x');

export async function checkDeployedContracts(
	client: PublicClient,
): Promise<{ name: string; address: Address; codeHash: Hex; hasCode: boolean }[]> {
	const result = deployedContracts.map(async ({ name, address }) => {
		const code = await client.getBytecode({ address });
		const codeHash = (code && keccak256(code)) || NO_CODE_HASH;
		return { name, address, codeHash, hasCode: codeHash !== NO_CODE_HASH };
	});
	return await Promise.all(result);
}

const deployedContracts: { name: string; address: Address }[] = [
	// Deterministic Deployer contracts.
	{ name: 'CreateX', address: '0xba5Ed099633D3B313e4D5F7bdc1305d3c28ba5Ed' },
	{
		name: "Arachnid's Deterministic Deployment Proxy",
		address: '0x4e59b44847b379578588920cA78FbF26c0B4956C',
	},
	{ name: 'Create2Deployer', address: '0x13b0D85CcB8bf860b6b79AF3029fCA081AE9beF2' },
	// ERC-4337.
	{ name: 'ERC-4337 Entry Point v0.6', address: '0x5FF137D4b0FDCD49DcA30c7CF57E578a026d2789' },
	{
		name: 'ERC-4337 Simple Account Factory v0.6',
		address: '0x9406Cc6185a346906296840746125a0E44976454',
	},
	// Other
	{ name: 'Multicall3', address: '0xcA11bde05977b3631167028862bE2a173976CA11' },
	{ name: 'Permit2', address: '0x000000000022D473030F116dDEE9F6B43aC78BA3' },
];
