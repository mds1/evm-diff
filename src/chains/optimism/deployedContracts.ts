import { deployedContracts as mainnetDeployedContracts } from '@/chains/mainnet/deployedContracts';

const optimismDeployedContracts = { ...mainnetDeployedContracts };
optimismDeployedContracts['Wrapped Native Token'] = {
	...optimismDeployedContracts['Wrapped Native Token'],
	address: '0x4200000000000000000000000000000000000006',
	references: [
		...optimismDeployedContracts['Wrapped Native Token'].references,
		'[Optimism Docs: What is ETH? WETH?](https://help.optimism.io/hc/en-us/articles/4417948883611-What-is-ETH-WETH-How-do-they-interact-)',
	],
	logicAbi: [
		'event Approval(address indexed src, address indexed guy, uint256 wad)',
		'event Deposit(address indexed dst, uint256 wad)',
		'event Transfer(address indexed src, address indexed dst, uint256 wad)',
		'event Withdrawal(address indexed src, uint256 wad)',
		'fallback()',
		'function allowance(address, address) view returns (uint256)',
		'function approve(address guy, uint256 wad) returns (bool)',
		'function balanceOf(address) view returns (uint256)',
		'function decimals() view returns (uint8)',
		'function deposit() payable',
		'function name() view returns (string)',
		'function symbol() view returns (string)',
		'function totalSupply() view returns (uint256)',
		'function transfer(address dst, uint256 wad) returns (bool)',
		'function transferFrom(address src, address dst, uint256 wad) returns (bool)',
		'function withdraw(uint256 wad)',
	],
};

export const deployedContracts = optimismDeployedContracts;
