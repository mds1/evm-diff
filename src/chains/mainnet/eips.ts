import { EIP, EIPState } from '@/types/eip';
import { MainnetHardfork, getHardforksFrom } from './hardforks';

const homesteadEIPs: EIP[] = [
  {
    number: 2,
    title: 'Homestead hard-fork changes',
    link: 'https://eips.ethereum.org/EIPS/eip-2',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Homestead),
    deprecated: false,
  },
  {
    number: 7,
    title: 'Delegatecall',
    link: 'https://eips.ethereum.org/EIPS/eip-7',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Homestead),
    deprecated: false,
  },
  {
    number: 8,
    title: 'Devp2p forward compatibility requirements for Homestead',
    link: 'https://eips.ethereum.org/EIPS/eip-8',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Homestead),
    deprecated: false,
  },
];

const tangerineWhistleEIPs: EIP[] = [
  {
    number: 150,
    title: 'Gas cost changes for IO-heavy operations',
    link: 'https://eips.ethereum.org/EIPS/eip-150',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.TangerineWhistle),
    deprecated: false,
  },
];

const spuriousDragonEIPS: EIP[] = [
  {
    number: 155,
    title: 'Simple replay attack protection',
    link: 'https://eips.ethereum.org/EIPS/eip-155',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.SpuriousDragon),
    deprecated: false,
  },
  {
    number: 160,
    title: 'EXP cost increase',
    link: 'https://eips.ethereum.org/EIPS/eip-160',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.SpuriousDragon),
    deprecated: false,
  },
  {
    number: 161,
    title: 'State trie clearing (invariant-preserving alternative)',
    link: 'https://eips.ethereum.org/EIPS/eip-161',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.SpuriousDragon),
    deprecated: false,
  },
  {
    number: 170,
    title: 'Contract code size limit',
    link: 'https://eips.ethereum.org/EIPS/eip-170',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.SpuriousDragon),
    deprecated: false,
    parameters: [
      {
        name: 'MAX_CODE_SIZE',
        value: 0x6000,
      },
    ],
  },
];

const byzantiumEIPs: EIP[] = [
  {
    number: 100,
    title: 'Change difficulty adjustment to target mean block time including uncles',
    link: 'https://eips.ethereum.org/EIPS/eip-100',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Byzantium),
    deprecated: false,
  },
  {
    number: 140,
    title: 'REVERT instruction',
    link: 'https://eips.ethereum.org/EIPS/eip-140',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Byzantium),
    deprecated: false,
  },
  {
    number: 196,
    title:
      'Precompiled contracts for addition and scalar multiplication on the elliptic curve alt_bn128',
    link: 'https://eips.ethereum.org/EIPS/eip-196',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Byzantium),
    deprecated: false,
  },
  {
    number: 197,
    title: 'Precompiled contracts for optimal ate pairing check on the elliptic curve alt_bn128',
    link: 'https://eips.ethereum.org/EIPS/eip-197',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Byzantium),
    deprecated: false,
  },
  {
    number: 198,
    title: 'Big integer modular exponentiation',
    link: 'https://eips.ethereum.org/EIPS/eip-198',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Byzantium),
    deprecated: false,
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
    activeHardforks: getHardforksFrom(MainnetHardfork.Byzantium),
    deprecated: false,
  },
  {
    number: 214,
    title: 'New opcode STATICCALL',
    link: 'https://eips.ethereum.org/EIPS/eip-214',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Byzantium),
    deprecated: false,
  },
  {
    number: 649,
    title: 'Metropolis Difficulty Bomb Delay and Block Reward Reduction',
    link: 'https://eips.ethereum.org/EIPS/eip-649',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Byzantium),
    deprecated: false,
  },
  {
    number: 658,
    title: 'Embedding transaction status code in receipts',
    link: 'https://eips.ethereum.org/EIPS/eip-658',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Byzantium),
    deprecated: false,
  },
];

const constantinopleEIPs: EIP[] = []; // TODO
const petersbugEIPs: EIP[] = []; // TODO
const istanbulEIPs: EIP[] = []; // TODO
const muirGlacierEIPs: EIP[] = []; // TODO
const berlinEIPs: EIP[] = []; // TODO
const londonEIPs: EIP[] = []; // TODO
const arrowGlacierEIPs: EIP[] = []; // TODO
const grayGlacierEIPs: EIP[] = []; // TODO
const parisEIPs: EIP[] = []; // TODO
const shanghaiEIps: EIP[] = []; // TODO

export const eips: EIP[] = [
  ...homesteadEIPs,
  ...tangerineWhistleEIPs,
  ...spuriousDragonEIPS,
  ...byzantiumEIPs,
  ...constantinopleEIPs,
  ...petersbugEIPs,
  ...istanbulEIPs,
  ...muirGlacierEIPs,
  ...berlinEIPs,
  ...londonEIPs,
  ...arrowGlacierEIPs,
  ...grayGlacierEIPs,
  ...parisEIPs,
  ...shanghaiEIps,
];
