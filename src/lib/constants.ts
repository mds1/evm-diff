import { MainnetHardforks } from '@/chains/mainnet/hardforks';

// Website
export const SITE_NAME = 'EVM Diff';
export const SITE_DESCRIPTION = 'Diff EVM-compatible chains';
export const COMPANY_NAME = 'Matt Solomon';
export const COMPANY_URL = 'https://twitter.com/msolomon44';
export const GITHUB_URL = 'https://github.com/mds1/evm-diff';
export const TWITTER_URL = 'https://twitter.com/msolomon44';

export const CURRENT_MAINNET_HARDFORK = MainnetHardforks.Shanghai;

// References
export const ETHEREUM_EXECUTION_SPECS_URL = 'https://github.com/ethereum/execution-specs';
// All opcodes are linked to their implementation in https://github.com/ethereum/execution-specs.
// To avoid having broken links, our links are referenced to a commit id (there's no release tag).
export const ETHEREUM_EXECUTION_SPECS_COMMIT_ID = 'ed5797d0b46eb1f25b1dfbe1060d5192a25d0768';
export const EVM_OPCODES_URL = 'https://www.evm.codes';
