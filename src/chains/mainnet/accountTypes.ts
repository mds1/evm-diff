import type { AccountType } from '@/types';

const ethereumAccounts = '[Ethereum Accounts](https://ethereum.org/en/developers/docs/accounts/)';

export const eoa: AccountType = {
	name: 'EOA',
	description: 'An externally-owned account (EOA) is controlled by a private key.',
	references: [ethereumAccounts],
	properties: {
		canBatchTxs: false,
		canInitiateTxs: true,
		hasCode: false,
		hasKeyPair: true,
		hasStorage: false,
	},
};

export const contract: AccountType = {
	name: 'Contract Account',
	description: 'A smart contract deployed to the network, controlled by code.',
	references: [ethereumAccounts],
	properties: {
		canBatchTxs: true,
		canInitiateTxs: false,
		hasCode: true,
		hasKeyPair: false,
		hasStorage: true,
	},
};

export const accountTypes = {
	[eoa.name]: eoa,
	[contract.name]: contract,
};
