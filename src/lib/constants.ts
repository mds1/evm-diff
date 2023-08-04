import { MainnetHardfork } from '@/chains/mainnet/hardforks';

// -------- Website data --------
export const SITE_NAME = 'EVM Diff';
export const SITE_DESCRIPTION = 'Diff EVM-compatible chains';
export const SITE_URL =
  process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : 'https://www.evmdiff.com';
export const OG_ENDPOINT = 'api/og'; // For reference, see `src/pages/og.tsx`.
export const COMPANY_NAME = 'Matt Solomon';
export const COMPANY_URL = 'https://twitter.com/msolomon44';
export const GITHUB_URL = 'https://github.com/mds1/evm-diff';
export const TWITTER_URL = 'https://twitter.com/msolomon44';

// -------- Data and References --------
export const CURRENT_MAINNET_HARDFORK = MainnetHardfork.Shanghai;

// All opcodes are linked to their implementation in https://github.com/ethereum/execution-specs.
// To avoid broken links, our links are referenced to a commit hash (there's no releases or tags).
export const ETHEREUM_EXECUTION_SPECS_URL = 'https://github.com/ethereum/execution-specs';
export const ETHEREUM_EXECUTION_SPECS_COMMIT_ID = '87f5e4f5ec03c6a23b2d2cd909482664f870fd1e';
export const EVM_OPCODES_URL = 'https://www.evm.codes';
