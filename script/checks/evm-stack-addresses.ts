import { type Address, type Hex, type PublicClient, keccak256 } from 'viem';

export type EVMStack = 'OP' | 'Orbit';

type Predeploy = {
	name: string;
	address: Address;
	kind: 'Predeploy' | 'Precompile';
};

export type EVMStackResult = Predeploy & {
	codeHash: Hex;
	exists: boolean;
};

const NO_CODE_HASH = keccak256('0x');
const INVALID_CODE_HASH = keccak256('0xfe');

export async function checkEvmStackAddresses(
	client: PublicClient,
): Promise<Record<EVMStack, EVMStackResult[]>> {
	const result: Record<EVMStack, EVMStackResult[]> = {
		OP: [],
		Orbit: [],
	};

	for (const stack of Object.keys(evmStackAddresses)) {
		const stackPredploys = evmStackAddresses[stack as EVMStack];
		const res = stackPredploys.map(async ({ name, address, kind }) => {
			const code = await client.getBytecode({ address });
			const codeHash = (code && keccak256(code)) || NO_CODE_HASH;
			const exists = evmStackAddressExists(stack as EVMStack, codeHash);
			return { name, address, kind, codeHash, exists };
		});
		result[stack as EVMStack] = await Promise.all(res);
	}

	return result;
}

// Check existence of an account for a given EVM Stack as follows:
//   - OP Stack: These are predeploys, so standard EVM bytecode should exist at the address.
//     Therefore we check for existence of code as normal.
//   - Orbit Stack: These are precompiles, but unlike standard EVM precompiles, they have code
//     of 0xfe, instead of empty code. Therefore we don't need to define test calldata and
//     expected return values, and instead just confirm the code is 0xfe.
function evmStackAddressExists(stack: EVMStack, codeHash: Hex): boolean {
	if (stack === 'OP' && codeHash !== NO_CODE_HASH && codeHash !== INVALID_CODE_HASH) return true;
	if (stack === 'Orbit' && codeHash === INVALID_CODE_HASH) return true;
	return false;
}

// Maps an EVM Stack to the expected predeploys for that stack.
// biome-ignore format: Easier to skim and update with one line per address.
export const evmStackAddresses: Record<EVMStack, Predeploy[]> = {
	OP: [
		{ address: '0x4200000000000000000000000000000000000000', name: 'LegacyMessagePasser', kind: 'Predeploy' },
		{ address: '0x4200000000000000000000000000000000000002', name: 'DeployerWhitelist', kind: 'Predeploy' },
		{ address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000', name: 'LegacyERC20ETH', kind: 'Predeploy' },
		{ address: '0x4200000000000000000000000000000000000006', name: 'WETH9', kind: 'Predeploy' },
		{ address: '0x4200000000000000000000000000000000000007', name: 'L2CrossDomainMessenger', kind: 'Predeploy' },
		{ address: '0x4200000000000000000000000000000000000010', name: 'L2StandardBridge', kind: 'Predeploy' },
		{ address: '0x4200000000000000000000000000000000000011', name: 'SequencerFeeVault', kind: 'Predeploy' },
		{ address: '0x4200000000000000000000000000000000000012', name: 'OptimismMintableERC20Factory', kind: 'Predeploy', },
		{ address: '0x4200000000000000000000000000000000000013', name: 'L1BlockNumber', kind: 'Predeploy' },
		{ address: '0x420000000000000000000000000000000000000F', name: 'GasPriceOracle', kind: 'Predeploy' },
		{ address: '0x4200000000000000000000000000000000000042', name: 'GovernanceToken', kind: 'Predeploy' },
		{ address: '0x4200000000000000000000000000000000000015', name: 'L1Block', kind: 'Predeploy' },
		{ address: '0x4200000000000000000000000000000000000016', name: 'L2ToL1MessagePasser', kind: 'Predeploy' },
		{ address: '0x4200000000000000000000000000000000000014', name: 'L2ERC721Bridge', kind: 'Predeploy' },
		{ address: '0x4200000000000000000000000000000000000017', name: 'OptimismMintableERC721Factory', kind: 'Predeploy', },
		{ address: '0x4200000000000000000000000000000000000018', name: 'ProxyAdmin', kind: 'Predeploy' },
		{ address: '0x4200000000000000000000000000000000000019', name: 'BaseFeeVault', kind: 'Predeploy' },
		{ address: '0x420000000000000000000000000000000000001a', name: 'L1FeeVault', kind: 'Predeploy' },
	],
	Orbit: [
		{ address: '0x0000000000000000000000000000000000000066', name: 'ArbAddressTable', kind: 'Predeploy'},
		{ address: '0x000000000000000000000000000000000000006D', name: 'ArbAggregator', kind: 'Predeploy'},
		{ address: '0x0000000000000000000000000000000000000068', name: 'ArbFunctionTable', kind: 'Predeploy'},
		{ address: '0x000000000000000000000000000000000000006C', name: 'ArbGasInfo', kind: 'Predeploy'},
		{ address: '0x0000000000000000000000000000000000000065', name: 'ArbInfo', kind: 'Predeploy'},
		{ address: '0x0000000000000000000000000000000000000070', name: 'ArbOwner', kind: 'Predeploy'},
		{ address: '0x000000000000000000000000000000000000006b', name: 'ArbOwnerPublic', kind: 'Predeploy'},
		{ address: '0x000000000000000000000000000000000000006E', name: 'ArbRetryableTx', kind: 'Predeploy'},
		{ address: '0x000000000000000000000000000000000000006F', name: 'ArbStatistics', kind: 'Predeploy'},
		{ address: '0x0000000000000000000000000000000000000064', name: 'ArbSys', kind: 'Predeploy'},
		{ address: '0x00000000000000000000000000000000000000C8', name: 'NodeInterface', kind: 'Predeploy'},
	],
};
