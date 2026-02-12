// -------- Website data --------
export const SITE_NAME = 'EVM Diff';
export const SITE_DESCRIPTION = 'Diff EVM-compatible chains';
export const SITE_URL =
	process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.evmdiff.com';
export const OG_ENDPOINT = '/api/og'; // For reference, see `src/pages/og.tsx`.
export const COMPANY_NAME = 'Matt Solomon';
export const COMPANY_URL = 'https://twitter.com/msolomon44';
export const GITHUB_URL = 'https://github.com/mds1/evm-diff';
export const TWITTER_URL = 'https://twitter.com/msolomon44';

// -------- Other Data --------
const BRANCH_NAME = process.env.NEXT_PUBLIC_BRANCH_NAME;
export const BASE_DATA_URL =
	process.env.NODE_ENV === 'development'
		? '/data'
		: `https://raw.githubusercontent.com/mds1/evm-diff/${BRANCH_NAME}/script/data`;

// This defines the source of truth for the data that is shown/hidden on the website.
export interface Feature {
	title: string;
	infoText?: string;
	hide?: boolean;
}

export const featureMap: Record<string, Feature> = {
	metadata: { title: 'Metadata' },
	opcodes: {
		title: 'Opcodes',
		infoText: 'Whether or not standard opcodes are supported.',
	},
	deployedContracts: {
		title: 'Deployed Contracts',
		infoText: 'Whether common utility contracts used by developers and users exist.',
	},
	precompiles: {
		title: 'Precompiles',
		infoText: 'Whether or not standard precompiles are supported.',
	},
	evmStackAddresses: {
		title: 'EVM Stack Addresses',
		infoText:
			'Existence of "stack-specific" accounts on a chain, to determine what kind of chain it is. If an account exists on both chains but shows up in the diff, it indicates the code hash is different. This does not necessarily mean the contract is different.',
		hide: true, // TODO refactor this into a summary of what stack/config is used, instead of showing all stack addresses.
	},
};
