import { EIP, EIPCategory, EIPState } from '@/types/eip';
import { MainnetHardfork, getMainnetHardforksFrom } from './hardforks';

const hardforksFromHomestead: string[] = getMainnetHardforksFrom(MainnetHardfork.Homestead);
const homesteadEIPs: EIP[] = [
  {
    number: 2,
    title: 'Homestead hard-fork changes',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromHomestead,
    references: ['https://eips.ethereum.org/EIPS/eip-2'],
  },
  {
    number: 7,
    title: 'Delegatecall',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromHomestead,
    references: ['https://eips.ethereum.org/EIPS/eip-7'],
  },
];

const hardforksFromTangerineWhistle: string[] = getMainnetHardforksFrom(
  MainnetHardfork.TangerineWhistle
);
const tangerineWhistleEIPs: EIP[] = [
  {
    number: 150,
    title: 'Gas cost changes for IO-heavy operations',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromTangerineWhistle,
    references: ['https://eips.ethereum.org/EIPS/eip-150'],
  },
];

const hardforksFromSpuriousDragon: string[] = getMainnetHardforksFrom(
  MainnetHardfork.SpuriousDragon
);
const spuriousDragonEIPS: EIP[] = [
  {
    number: 155,
    title: 'Simple replay attack protection',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromSpuriousDragon,
    references: ['https://eips.ethereum.org/EIPS/eip-155'],
  },
  {
    number: 160,
    title: 'EXP cost increase',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromSpuriousDragon,
    references: ['https://eips.ethereum.org/EIPS/eip-160'],
  },
  {
    number: 161,
    title: 'State trie clearing (invariant-preserving alternative)',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromSpuriousDragon,
    references: ['https://eips.ethereum.org/EIPS/eip-161'],
  },
  {
    number: 170,
    title: 'Contract code size limit',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromSpuriousDragon,
    parameters: [
      {
        name: 'MAX_CODE_SIZE',
        value: 24576,
      },
    ],
    references: ['https://eips.ethereum.org/EIPS/eip-170'],
  },
];

const hardforksFromByzantium: string[] = getMainnetHardforksFrom(MainnetHardfork.Byzantium);
const byzantiumEIPs: EIP[] = [
  {
    number: 100,
    title: 'Change difficulty adjustment to target mean block time including uncles',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
    references: ['https://eips.ethereum.org/EIPS/eip-100'],
  },
  {
    number: 140,
    title: 'REVERT instruction',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
    references: ['https://eips.ethereum.org/EIPS/eip-140'],
  },
  {
    number: 196,
    title:
      'Precompiled contracts for addition and scalar multiplication on the elliptic curve alt_bn128',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
    references: ['https://eips.ethereum.org/EIPS/eip-196'],
  },
  {
    number: 197,
    title: 'Precompiled contracts for optimal ate pairing check on the elliptic curve alt_bn128',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
    references: ['https://eips.ethereum.org/EIPS/eip-197'],
  },
  {
    number: 198,
    title: 'Big integer modular exponentiation',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
    parameters: [
      {
        name: 'GQUADDIVISOR',
        value: 20,
      },
    ],
    references: ['https://eips.ethereum.org/EIPS/eip-198'],
  },
  {
    number: 211,
    title: 'New opcodes: RETURNDATASIZE and RETURNDATACOPY',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
    references: ['https://eips.ethereum.org/EIPS/eip-211'],
  },
  {
    number: 214,
    title: 'New opcode STATICCALL',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
    references: ['https://eips.ethereum.org/EIPS/eip-214'],
  },
  {
    number: 649,
    title: 'Metropolis Difficulty Bomb Delay and Block Reward Reduction',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
    references: ['https://eips.ethereum.org/EIPS/eip-649'],
  },
  {
    number: 658,
    title: 'Embedding transaction status code in receipts',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
    references: ['https://eips.ethereum.org/EIPS/eip-658'],
  },
];

// Both the Constantinople and Petersburg hard forks went live at the same time. The Petersburg hard
// fork incorporates identical EIPs as the Constantinople hard fork, excluding the final EIP, EIP-1283.
// As EIP-1283 was never implemented in a production environment, we have opted not to display it.
const hardforksFromConstantinople: string[] = getMainnetHardforksFrom(
  MainnetHardfork.Constantinople
);
const constantinopleEIPs: EIP[] = [
  {
    number: 145,
    title: 'Bitwise shifting instructions in EVM',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromConstantinople,
    references: ['https://eips.ethereum.org/EIPS/eip-145'],
  },
  {
    number: 1014,
    title: 'Skinny CREATE2',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromConstantinople,
    references: ['https://eips.ethereum.org/EIPS/eip-1014'],
  },
  {
    number: 1052,
    title: 'EXTCODEHASH opcode',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromConstantinople,
    references: ['https://eips.ethereum.org/EIPS/eip-1052'],
  },
  {
    number: 1234,
    title: 'Constantinople Difficulty Bomb Delay and Block Reward Adjustment',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromConstantinople,
    references: ['https://eips.ethereum.org/EIPS/eip-1234'],
  },
];

const hardforksFromIstanbul: string[] = getMainnetHardforksFrom(MainnetHardfork.Istanbul);
const istanbulEIPs: EIP[] = [
  {
    number: 152,
    title: 'BAdd BLAKE2 compression function `F` precompile',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromIstanbul,
    references: ['https://eips.ethereum.org/EIPS/eip-152'],
  },
  {
    number: 1108,
    title: 'Reduce alt_bn128 precompile gas costs',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromIstanbul,
    references: ['https://eips.ethereum.org/EIPS/eip-1108'],
  },
  {
    number: 1344,
    title: 'ChainID opcode',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromIstanbul,
    references: ['https://eips.ethereum.org/EIPS/eip-1344'],
  },
  {
    number: 1884,
    title: 'Repricing for trie-size-dependent opcodes',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromIstanbul,
    references: ['https://eips.ethereum.org/EIPS/eip-1884'],
  },
  {
    number: 2028,
    title: 'Transaction data gas cost reduction',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromIstanbul,
    references: ['https://eips.ethereum.org/EIPS/eip-2028'],
  },
  {
    number: 2200,
    title: 'Structured Definitions for Net Gas Metering',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromIstanbul,
    references: ['https://eips.ethereum.org/EIPS/eip-2200'],
  },
];

const hardforksFromMuirGlacier: string[] = getMainnetHardforksFrom(MainnetHardfork.MuirGlacier);
const muirGlacierEIPs: EIP[] = [
  {
    number: 2384,
    title: 'Muir Glacier Difficulty Bomb Delay',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromMuirGlacier,
    references: ['https://eips.ethereum.org/EIPS/eip-2384'],
  },
];

const hardforksFromBerlin: string[] = getMainnetHardforksFrom(MainnetHardfork.Berlin);
const berlinEIPs: EIP[] = [
  {
    number: 2565,
    title: 'ModExp Gas Cost',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromBerlin,
    references: ['https://eips.ethereum.org/EIPS/eip-2565'],
  },
  {
    number: 2929,
    title: 'Gas cost increases for state access opcodes',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromBerlin,
    parameters: [
      {
        name: 'COLD_SLOAD_COST',
        value: 2100,
      },
      {
        name: 'COLD_ACCOUNT_ACCESS_COST',
        value: 2600,
      },
      {
        name: 'WARM_STORAGE_READ_COST',
        value: 100,
      },
    ],
    references: ['https://eips.ethereum.org/EIPS/eip-2929'],
  },
  {
    number: 2718,
    title: 'Typed Transaction Envelope',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromBerlin,
    references: ['https://eips.ethereum.org/EIPS/eip-2718'],
  },
  {
    number: 2930,
    title: 'Optional access lists',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromBerlin,
    parameters: [
      {
        name: 'ACCESS_LIST_STORAGE_KEY_COST',
        value: 1900,
      },
      {
        name: 'ACCESS_LIST_ADDRESS_COST',
        value: 2400,
      },
    ],
    references: ['https://eips.ethereum.org/EIPS/eip-2930'],
  },
];

const hardforksFromLondon: string[] = getMainnetHardforksFrom(MainnetHardfork.London);

export const eip1559: EIP = {
  number: 1559,
  title: 'Fee market change for ETH 1.0 chain',
  category: EIPCategory.Execution,

  status: EIPState.Final,
  activeHardforks: hardforksFromLondon,
  parameters: [
    {
      name: 'INITIAL_BASE_FEE',
      value: 1000000000,
    },
    {
      name: 'BASE_FEE_MAX_CHANGE_DENOMINATOR',
      value: 8,
    },
    {
      name: 'ELASTICITY_MULTIPLIER',
      value: 2,
    },
  ],
  references: ['https://eips.ethereum.org/EIPS/eip-1559'],
};

const londonEIPs: EIP[] = [
  eip1559,
  {
    number: 3198,
    title: 'BASEFEE opcode',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromLondon,
    references: ['https://eips.ethereum.org/EIPS/eip-3198'],
  },
  {
    number: 3529,
    title: 'Reduction in refunds',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromLondon,
    parameters: [
      {
        name: 'MAX_REFUND_QUOTIENT',
        value: 5,
      },
    ],
    references: ['https://eips.ethereum.org/EIPS/eip-3529'],
  },
  {
    number: 3541,
    title: 'Reject new contract code starting with the 0xEF byte',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromLondon,
    references: ['https://eips.ethereum.org/EIPS/eip-3541'],
  },
  {
    number: 3554,
    title: 'Difficulty Bomb Delay to December 2021',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromLondon,
    references: ['https://eips.ethereum.org/EIPS/eip-3554'],
  },
];

const hardforksFromArrowGlacier: string[] = getMainnetHardforksFrom(MainnetHardfork.ArrowGlacier);
const arrowGlacierEIPs: EIP[] = [
  {
    number: 4345,
    title: 'Difficulty Bomb Delay to June 2022',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromArrowGlacier,
    references: ['https://eips.ethereum.org/EIPS/eip-4345'],
  },
];

const hardforksFromGrayGlacier: string[] = getMainnetHardforksFrom(MainnetHardfork.GrayGlacier);
const grayGlacierEIPs: EIP[] = [
  {
    number: 5133,
    title: 'Delaying Difficulty Bomb to mid-September 2022',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromGrayGlacier,
    references: ['https://eips.ethereum.org/EIPS/eip-5133'],
  },
];

const hardforksFromParis: string[] = getMainnetHardforksFrom(MainnetHardfork.Paris);

export const eip4399: EIP = {
  number: 4399,
  title: 'Supplant DIFFICULTY opcode with PREVRANDAO',
  category: EIPCategory.Execution,

  status: EIPState.Final,
  activeHardforks: hardforksFromParis,
  notes: [
    "PREVRANDAO returns the random output of the L1 beacon chain's oracle from approximately 5 L1 blocks ago.",
  ],
  references: ['https://eips.ethereum.org/EIPS/eip-4399'],
};

export const parisEIPs: EIP[] = [
  {
    number: 3675,
    title: 'Upgrade consensus to Proof-of-Stake',
    category: EIPCategory.Consensus,

    status: EIPState.Final,
    activeHardforks: hardforksFromParis,
    parameters: [
      {
        name: 'MAX_EXTRA_DATA_BYTES',
        value: 32,
      },
    ],
    references: ['https://eips.ethereum.org/EIPS/eip-3675'],
  },
  eip4399,
];

const hardforksFromShanghai: string[] = getMainnetHardforksFrom(MainnetHardfork.Shanghai);

export const eip4895: EIP = {
  number: 4895,
  title: 'Beacon chain push withdrawals as operations',
  category: EIPCategory.Execution,
  status: EIPState.Final,
  activeHardforks: hardforksFromShanghai,
  references: ['https://eips.ethereum.org/EIPS/eip-4895'],
};

const shanghaiEIPs: EIP[] = [
  {
    number: 3651,
    title: 'Warm COINBASE',
    category: EIPCategory.Execution,
    status: EIPState.Final,
    activeHardforks: hardforksFromShanghai,
    references: ['https://eips.ethereum.org/EIPS/eip-3651'],
  },
  {
    number: 3855,
    title: 'PUSH0 instruction',
    category: EIPCategory.Execution,
    status: EIPState.Final,
    activeHardforks: hardforksFromShanghai,
    references: ['https://eips.ethereum.org/EIPS/eip-3855'],
  },
  {
    number: 3860,
    title: 'Limit and meter initcode',
    category: EIPCategory.Execution,

    status: EIPState.Final,
    activeHardforks: hardforksFromShanghai,
    parameters: [
      {
        name: 'INITCODE_WORD_COST',
        value: 2,
      },
      {
        name: 'MAX_INITCODE_SIZE',
        value: '49152 = 2 * MAX_CODE_SIZE where MAX_CODE_SIZE=24576',
      },
    ],
    references: ['https://eips.ethereum.org/EIPS/eip-3860'],
  },
  eip4895,
];

export const eips: EIP[] = [
  ...homesteadEIPs,
  ...tangerineWhistleEIPs,
  ...spuriousDragonEIPS,
  ...byzantiumEIPs,
  ...constantinopleEIPs,
  ...istanbulEIPs,
  ...muirGlacierEIPs,
  ...berlinEIPs,
  ...londonEIPs,
  ...arrowGlacierEIPs,
  ...grayGlacierEIPs,
  ...parisEIPs,
  ...shanghaiEIPs,
];
