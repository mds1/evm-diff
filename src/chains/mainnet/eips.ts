import { EIP, EIPState } from '@/types/eip';
import { MainnetHardfork, getHardforksFrom } from './hardforks';

const hardforksFromHomestead: string[] = getHardforksFrom(MainnetHardfork.Homestead);
const homesteadEIPs: EIP[] = [
  {
    number: 2,
    title: 'Homestead hard-fork changes',
    link: 'https://eips.ethereum.org/EIPS/eip-2',
    status: EIPState.Final,
    activeHardforks: hardforksFromHomestead,
  },
  {
    number: 7,
    title: 'Delegatecall',
    link: 'https://eips.ethereum.org/EIPS/eip-7',
    status: EIPState.Final,
    activeHardforks: hardforksFromHomestead,
  },
  {
    number: 8,
    title: 'Devp2p forward compatibility requirements for Homestead',
    link: 'https://eips.ethereum.org/EIPS/eip-8',
    status: EIPState.Final,
    activeHardforks: hardforksFromHomestead,
  },
];

const hardforksFromTangerineWhistle: string[] = getHardforksFrom(MainnetHardfork.TangerineWhistle);
const tangerineWhistleEIPs: EIP[] = [
  {
    number: 150,
    title: 'Gas cost changes for IO-heavy operations',
    link: 'https://eips.ethereum.org/EIPS/eip-150',
    status: EIPState.Final,
    activeHardforks: hardforksFromTangerineWhistle,
  },
];

const hardforksFromSpuriousDragon: string[] = getHardforksFrom(MainnetHardfork.SpuriousDragon);
const spuriousDragonEIPS: EIP[] = [
  {
    number: 155,
    title: 'Simple replay attack protection',
    link: 'https://eips.ethereum.org/EIPS/eip-155',
    status: EIPState.Final,
    activeHardforks: hardforksFromSpuriousDragon,
  },
  {
    number: 160,
    title: 'EXP cost increase',
    link: 'https://eips.ethereum.org/EIPS/eip-160',
    status: EIPState.Final,
    activeHardforks: hardforksFromSpuriousDragon,
  },
  {
    number: 161,
    title: 'State trie clearing (invariant-preserving alternative)',
    link: 'https://eips.ethereum.org/EIPS/eip-161',
    status: EIPState.Final,
    activeHardforks: hardforksFromSpuriousDragon,
  },
  {
    number: 170,
    title: 'Contract code size limit',
    link: 'https://eips.ethereum.org/EIPS/eip-170',
    status: EIPState.Final,
    activeHardforks: hardforksFromSpuriousDragon,
    parameters: [
      {
        name: 'MAX_CODE_SIZE',
        value: 24576,
      },
    ],
  },
];

const hardforksFromByzantium: string[] = getHardforksFrom(MainnetHardfork.Byzantium);
const byzantiumEIPs: EIP[] = [
  {
    number: 100,
    title: 'Change difficulty adjustment to target mean block time including uncles',
    link: 'https://eips.ethereum.org/EIPS/eip-100',
    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
  },
  {
    number: 140,
    title: 'REVERT instruction',
    link: 'https://eips.ethereum.org/EIPS/eip-140',
    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
  },
  {
    number: 196,
    title:
      'Precompiled contracts for addition and scalar multiplication on the elliptic curve alt_bn128',
    link: 'https://eips.ethereum.org/EIPS/eip-196',
    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
  },
  {
    number: 197,
    title: 'Precompiled contracts for optimal ate pairing check on the elliptic curve alt_bn128',
    link: 'https://eips.ethereum.org/EIPS/eip-197',
    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
  },
  {
    number: 198,
    title: 'Big integer modular exponentiation',
    link: 'https://eips.ethereum.org/EIPS/eip-198',
    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
    parameters: [
      {
        name: 'GQUADDIVISOR',
        value: 20,
      },
    ],
  },
  {
    number: 211,
    title: 'New opcodes: RETURNDATASIZE and RETURNDATACOPY',
    link: 'https://eips.ethereum.org/EIPS/eip-211',
    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
  },
  {
    number: 214,
    title: 'New opcode STATICCALL',
    link: 'https://eips.ethereum.org/EIPS/eip-214',
    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
  },
  {
    number: 649,
    title: 'Metropolis Difficulty Bomb Delay and Block Reward Reduction',
    link: 'https://eips.ethereum.org/EIPS/eip-649',
    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
  },
  {
    number: 658,
    title: 'Embedding transaction status code in receipts',
    link: 'https://eips.ethereum.org/EIPS/eip-658',
    status: EIPState.Final,
    activeHardforks: hardforksFromByzantium,
  },
];

const hardforksFromConstantinople: string[] = getHardforksFrom(MainnetHardfork.Byzantium);
const constantinopleEIPs: EIP[] = [
  {
    number: 145,
    title: 'Bitwise shifting instructions in EVM',
    link: 'https://eips.ethereum.org/EIPS/eip-145',
    status: EIPState.Final,
    activeHardforks: hardforksFromConstantinople,
  },
  {
    number: 1014,
    title: 'Skinny CREATE2',
    link: 'https://eips.ethereum.org/EIPS/eip-1014',
    status: EIPState.Final,
    activeHardforks: hardforksFromConstantinople,
  },
  {
    number: 1052,
    title: 'EXTCODEHASH opcode',
    link: 'https://eips.ethereum.org/EIPS/eip-1052',
    status: EIPState.Final,
    activeHardforks: hardforksFromConstantinople,
  },
  {
    number: 1234,
    title: 'Constantinople Difficulty Bomb Delay and Block Reward Adjustment',
    link: 'https://eips.ethereum.org/EIPS/eip-1234',
    status: EIPState.Final,
    activeHardforks: hardforksFromConstantinople,
  },
  {
    number: 1283,
    title: 'Net gas metering for SSTORE without dirty maps',
    link: 'https://eips.ethereum.org/EIPS/eip-1283',
    status: EIPState.Final,
    activeHardforks: hardforksFromConstantinople,
  },
];

// The Petersburg hard fork includes the same EIPs as the Constantinople, except the last EIP, EIP-1283.
const petersburgEIPs: EIP[] = constantinopleEIPs.slice(0, 3).map((eip) => ({
  ...eip,
  activeHardforks: hardforksFromConstantinople,
}));

const hardforksFromIstanbul: string[] = getHardforksFrom(MainnetHardfork.Istanbul);
const istanbulEIPs: EIP[] = [
  {
    number: 152,
    title: 'BAdd BLAKE2 compression function `F` precompile',
    link: 'https://eips.ethereum.org/EIPS/eip-152',
    status: EIPState.Final,
    activeHardforks: hardforksFromIstanbul,
  },
  {
    number: 1108,
    title: 'Reduce alt_bn128 precompile gas costs',
    link: 'https://eips.ethereum.org/EIPS/eip-1108',
    status: EIPState.Final,
    activeHardforks: hardforksFromIstanbul,
  },
  {
    number: 1344,
    title: 'ChainID opcode',
    link: 'https://eips.ethereum.org/EIPS/eip-1344',
    status: EIPState.Final,
    activeHardforks: hardforksFromIstanbul,
  },
  {
    number: 1884,
    title: 'Repricing for trie-size-dependent opcodes',
    link: 'https://eips.ethereum.org/EIPS/eip-1884',
    status: EIPState.Final,
    activeHardforks: hardforksFromIstanbul,
  },
  {
    number: 2028,
    title: 'Transaction data gas cost reduction',
    link: 'https://eips.ethereum.org/EIPS/eip-2028',
    status: EIPState.Final,
    activeHardforks: hardforksFromIstanbul,
  },
  {
    number: 2200,
    title: 'Structured Definitions for Net Gas Metering',
    link: 'https://eips.ethereum.org/EIPS/eip-2200',
    status: EIPState.Final,
    activeHardforks: hardforksFromIstanbul,
  },
];

const hardforksFromMuirGlacier: string[] = getHardforksFrom(MainnetHardfork.MuirGlacier);
const muirGlacierEIPs: EIP[] = [
  {
    number: 2384,
    title: 'Muir Glacier Difficulty Bomb Delay',
    link: 'https://eips.ethereum.org/EIPS/eip-2384',
    status: EIPState.Final,
    activeHardforks: hardforksFromMuirGlacier,
  },
];

const hardforksFromBerlin: string[] = getHardforksFrom(MainnetHardfork.Berlin);
const berlinEIPs: EIP[] = [
  {
    number: 2565,
    title: 'ModExp Gas Cost',
    link: 'https://eips.ethereum.org/EIPS/eip-2565',
    status: EIPState.Final,
    activeHardforks: hardforksFromBerlin,
  },
  {
    number: 2929,
    title: 'Gas cost increases for state access opcodes',
    link: 'https://eips.ethereum.org/EIPS/eip-2929',
    status: EIPState.Final,
    activeHardforks: hardforksFromBerlin,
  },
  {
    number: 2718,
    title: 'Typed Transaction Envelope',
    link: 'https://eips.ethereum.org/EIPS/eip-2718',
    status: EIPState.Final,
    activeHardforks: hardforksFromBerlin,
  },
  {
    number: 2930,
    title: 'Optional access lists',
    link: 'https://eips.ethereum.org/EIPS/eip-2930',
    status: EIPState.Final,
    activeHardforks: hardforksFromBerlin,
  },
];

const hardforksFromLondon: string[] = getHardforksFrom(MainnetHardfork.London);
const londonEIPs: EIP[] = [
  {
    number: 1559,
    title: 'Fee market change for ETH 1.0 chain',
    link: 'https://eips.ethereum.org/EIPS/eip-1559',
    status: EIPState.Final,
    activeHardforks: hardforksFromLondon,
    parameters: [
      {
        name: 'INITIAL_BASE_FEE',
        value: 1000000000,
      },
      {
        name: 'INITIAL_FORK_BLOCK_NUMBER',
        value: 10,
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
  },
  {
    number: 3198,
    title: 'BASEFEE opcode',
    link: 'https://eips.ethereum.org/EIPS/eip-3198',
    status: EIPState.Final,
    activeHardforks: hardforksFromLondon,
  },
  {
    number: 3529,
    title: 'Reduction in refunds',
    link: 'https://eips.ethereum.org/EIPS/eip-3529',
    status: EIPState.Final,
    activeHardforks: hardforksFromLondon,
    parameters: [
      {
        name: 'MAX_REFUND_QUOTIENT',
        value: 5,
      },
    ],
  },
  {
    number: 3541,
    title: 'Reject new contract code starting with the 0xEF byte',
    link: 'https://eips.ethereum.org/EIPS/eip-3541',
    status: EIPState.Final,
    activeHardforks: hardforksFromLondon,
  },
  {
    number: 3554,
    title: 'Difficulty Bomb Delay to December 2021',
    link: 'https://eips.ethereum.org/EIPS/eip-3554',
    status: EIPState.Final,
    activeHardforks: hardforksFromLondon,
  },
];

const hardforksFromArrowGlacier: string[] = getHardforksFrom(MainnetHardfork.ArrowGlacier);
const arrowGlacierEIPs: EIP[] = [
  {
    number: 4345,
    title: 'Difficulty Bomb Delay to June 2022',
    link: 'https://eips.ethereum.org/EIPS/eip-4345',
    status: EIPState.Final,
    activeHardforks: hardforksFromArrowGlacier,
  },
];

const hardforksFromGrayGlacier: string[] = getHardforksFrom(MainnetHardfork.GrayGlacier);
const grayGlacierEIPs: EIP[] = [
  {
    number: 5133,
    title: 'Delaying Difficulty Bomb to mid-September 2022',
    link: 'https://eips.ethereum.org/EIPS/eip-5133',
    status: EIPState.Final,
    activeHardforks: hardforksFromGrayGlacier,
  },
];

const hardforksFromParis: string[] = getHardforksFrom(MainnetHardfork.Paris);
const parisEIPs: EIP[] = [
  {
    number: 3675,
    title: 'Upgrade consensus to Proof-of-Stake',
    link: 'https://eips.ethereum.org/EIPS/eip-3675',
    status: EIPState.Final,
    activeHardforks: hardforksFromParis,
    // TODO: Add parameters.
  },
  {
    number: 4399,
    title: 'Supplant DIFFICULTY opcode with PREVRANDAO',
    link: 'https://eips.ethereum.org/EIPS/eip-4399',
    status: EIPState.Final,
    activeHardforks: hardforksFromParis,
  },
];

const hardforksFromShanghai: string[] = getHardforksFrom(MainnetHardfork.Shanghai);
const shanghaiEIps: EIP[] = [
  {
    number: 3651,
    title: 'Warm COINBASE',
    link: 'https://eips.ethereum.org/EIPS/eip-3651',
    status: EIPState.Final,
    activeHardforks: hardforksFromShanghai,
  },
  {
    number: 3855,
    title: 'PUSH0 instruction',
    link: 'https://eips.ethereum.org/EIPS/eip-3855',
    status: EIPState.Final,
    activeHardforks: hardforksFromShanghai,
  },
  {
    number: 3860,
    title: 'Limit and meter initcode',
    link: 'https://eips.ethereum.org/EIPS/eip-3860',
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
  },
  {
    number: 4895,
    title: 'Beacon chain push withdrawals as operations',
    link: 'https://eips.ethereum.org/EIPS/eip-4895',
    status: EIPState.Final,
    activeHardforks: hardforksFromShanghai,
  },
];

export const eips: EIP[] = [
  ...homesteadEIPs,
  ...tangerineWhistleEIPs,
  ...spuriousDragonEIPS,
  ...byzantiumEIPs,
  ...constantinopleEIPs,
  ...petersburgEIPs,
  ...istanbulEIPs,
  ...muirGlacierEIPs,
  ...berlinEIPs,
  ...londonEIPs,
  ...arrowGlacierEIPs,
  ...grayGlacierEIPs,
  ...parisEIPs,
  ...shanghaiEIps,
];
