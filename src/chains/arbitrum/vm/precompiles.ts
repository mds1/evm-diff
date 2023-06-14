import { Precompile, Predeploy } from '@/chains';
import { precompiles as mainnetPrecompiles } from '@/chains/mainnet/vm/precompiles';

// https://developer.arbitrum.io/useful-addresses#arbitrum-precompiles-l2-same-on-all-arb-chains
export const precompiles: (Precompile | Predeploy)[] = [
  ...mainnetPrecompiles,
  {
    address: '0x5288c571Fd7aD117beA99bF60FE0846C4E84F933',
    name: 'L2 Gateway Router',
    description:
      'Handles withdrawals from Ethereum into Arbitrum. Tokens are routed to their appropriate L2 gateway (Router itself also conforms to the Gateway interface).',
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x09e9222E96E7B4AE2a407B98d48e330053351EEe',
    name: 'L2 ERC20 Gateway',
    description:
      "Initiates Arbitrum to Ethereum ERC20 transfers, which are forwarded to the token's L2 Gateway to communicate with its corresponding L1 Gateway.",
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x096760F208390250649E3e8763348E783AEF5562',
    name: 'L2 Arb-Custom Gateway',
    description:
      'Allows to transfer of custom tokens from Arbitrum to Ethereum, which are forwarded to the L2 Gateway to communicate with its corresponding L1 Gateway.',
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x6c411aD3E74De3E7Bd422b94A27770f5B86C623B',
    name: 'L2 Weth Gateway',
    description:
      "Handles Arbitrum to Ethereum transfers of WETH by unwrapping the Ether and re-wrapping it on Ethereum, ensuring that all WETH tokens are always fully collateralized on the layer it's transferred to.",
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x82aF49447D8a07e3bd95BD0d56f35241523fBab1',
    name: 'L2 Weth',
    description:
      'Wrapped Ether contract on Arbitrum, which is an ERC-20 token that represents 1 Ether.',
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0xd570aCE65C43af47101fC6250FD6fC63D1c22a86',
    name: 'L2 Proxy Admin',
    description: 'The owner of all of the Arbitrum proxy contracts set at the predeploys.',
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x0000000000000000000000000000000000000064',
    name: 'ArbSys',
    description:
      'Exposes a variety of system-level functionality for interacting with Ethereum and understanding the call stack.',
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x000000000000000000000000000000000000006E',
    name: 'ArbRetryableTx',
    description: 'Manages retryable transactions related to data retrieval and interactions.',
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x000000000000000000000000000000000000006C',
    name: 'ArbGasInfo',
    description: 'Provides insight into the costs of using Arbitrum.',
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x0000000000000000000000000000000000000066',
    name: 'ArbAddressTable',
    description:
      'Allows registering and retrieving commonly used addresses via indices, saving calldata.',
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x000000000000000000000000000000000000006F',
    name: 'ArbStatistics',
    description:
      'Provides statistics about Arbitrum, such as the number of blocks, accounts, transactions, and contracts.',
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x00000000000000000000000000000000000000C8',
    name: 'NodeInterface',
    description:
      'Retrieves the revenant data of calls by Arbitrum contracts to execute them in Ethereum via the Outbox contract.',
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x0000000000000000000000000000000000000067',
    name: 'ArbBLS',
    description: 'Provides a registry of BLS public keys for accounts.',
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x0000000000000000000000000000000000000065',
    name: 'ArbInfo',
    description: 'Provides the ability to lookup basic info about accounts and contracts.',
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x000000000000000000000000000000000000006D',
    name: 'ArbAggregator',
    description:
      "Provides aggregators and their users methods for configuring how they participate in Ethereum aggregation. The default aggregator is Arbitrum's Sequencer.",
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
  {
    address: '0x0000000000000000000000000000000000000068',
    name: 'ArbFunctionTable',
    description:
      'Allows aggregators to manage function tables for one form of transaction compression.',
    deprecated: false,
    references: ['https://developer.arbitrum.io/for-devs/useful-addresses'],
  },
];
