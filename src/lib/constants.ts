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
export const BASE_DATA_URL = `https://raw.githubusercontent.com/mds1/evm-diff/${BRANCH_NAME}/script/data`;
