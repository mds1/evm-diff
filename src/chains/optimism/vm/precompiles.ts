import { precompiles as mainnetPrecompiles } from '@/chains/mainnet/vm/precompiles';
import { Precompile, Predeploy } from '@/types';

// https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md
export const precompiles: (Precompile | Predeploy)[] = [
  ...mainnetPrecompiles,
  {
    address: '0x4200000000000000000000000000000000000000',
    name: 'LegacyMessagePasser',
    description: 'Stores commitments to withdrawal transactions before the Bedrock upgrade.',
    deprecated: true,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x4200000000000000000000000000000000000002',
    name: 'DeployerWhitelist',
    description:
      'Defined a list of accounts that were allowed to deploy contracts during the initial phases of Optimism.',
    deprecated: true,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0xDeadDeAddeAddEAddeadDEaDDEAdDeaDDeAD0000',
    name: 'LegacyERC20ETH',
    description: 'Represents all Ether in the system before Bedrock.',
    deprecated: true,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x4200000000000000000000000000000000000006',
    name: 'WETH9',
    description: "Wrapped Ether contract, behaves identically to mainnet's canonical WETH.",
    deprecated: false,
    references: [
      'https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md',
      'https://help.optimism.io/hc/en-us/articles/4417948883611-What-is-ETH-WETH-How-do-they-interact-',
    ],
  },
  {
    address: '0x4200000000000000000000000000000000000007',
    name: 'L2CrossDomainMessenger',
    description:
      'Provides a higher level API for sending cross-domain messages, compared to directly calling L2ToL1MessagePasser.',
    deprecated: false,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x4200000000000000000000000000000000000010',
    name: 'L2StandardBridge',
    description:
      'Higher level API built on top of the L2CrossDomainMessenger that gives a standard interface for sending ETH or ERC20 tokens across domains.',
    deprecated: false,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x4200000000000000000000000000000000000011',
    name: 'SequencerFeeVault',
    description:
      'Accumulates any transaction priority fees and is the value of block.coinbase. When enough fees accumulate in this account, they can be withdrawn to an immutable L1 address.',
    deprecated: false,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x4200000000000000000000000000000000000012',
    name: 'OptimismMintableERC20Factory',
    description:
      'Responsible for creating ERC20 contracts on L2 that can be used for depositing native L1 tokens into.',
    deprecated: false,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x4200000000000000000000000000000000000013',
    name: 'L1BlockNumber',
    description: 'Returns the last known L1 block number.',
    deprecated: true,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x420000000000000000000000000000000000000F',
    name: 'GasPriceOracle',
    description: 'Provides an API to return the L1 portion of the fee for a transaction.',
    deprecated: false,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x4200000000000000000000000000000000000042',
    name: 'GovernanceToken',
    description: 'The Optimism (OP) token contract.',
    deprecated: false,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x4200000000000000000000000000000000000015',
    name: 'L1Block',
    description: 'Allows for L1 state to be accessed in L2.',
    deprecated: false,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x4200000000000000000000000000000000000016',
    name: 'L2ToL1MessagePasser',
    description: 'Stores commitments to withdrawal transactions.',
    deprecated: false,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x4200000000000000000000000000000000000014',
    name: 'L2ERC721Bridge',
    description:
      'Works together with the L1 ERC721 bridge to enable transfers of ERC721 tokens from Ethereum to Optimism.',
    deprecated: false,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x4200000000000000000000000000000000000017',
    name: 'OptimismMintableERC721Factory',
    description:
      'Responsible for creating ERC721 contracts on L2 that can be used for depositing native L1 NFTs into.',
    deprecated: false,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x4200000000000000000000000000000000000018',
    name: 'ProxyAdmin',
    description: 'The owner of all of the proxy contracts set at the predeploys.',
    deprecated: false,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x4200000000000000000000000000000000000019',
    name: 'BaseFeeVault',
    description:
      'Receives the base fees on L2, since the basefee is not burnt on L2 like it is on L1.',
    deprecated: false,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
  {
    address: '0x420000000000000000000000000000000000001a',
    name: 'L1FeeVault',
    description:
      'Receives the L1 portion of the transaction fees. Once the contract has received a certain amount of fees, the ETH can be withdrawn to an immutable address on L1.',
    deprecated: false,
    references: ['https://github.com/ethereum-optimism/optimism/blob/develop/specs/predeploys.md'],
  },
];
