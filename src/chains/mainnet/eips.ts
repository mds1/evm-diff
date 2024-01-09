import { EIP, EIPState } from '@/types/eip';
import { MainnetHardfork, getHardforksFrom } from './hardforks';

const homesteadEIPs: EIP[] = [
  {
    number: 2,
    title: 'Homestead Hard-fork Changes',
    link: 'https://eips.ethereum.org/EIPS/eip-2',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Homestead),
    deprecated: false,
  },
  {
    number: 7,
    title: 'DELEGATECALL',
    link: 'https://eips.ethereum.org/EIPS/eip-7',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Homestead),
    deprecated: false,
  },
  {
    number: 8,
    title: 'devp2p Forward Compatibility Requirements for Homestead',
    link: 'https://eips.ethereum.org/EIPS/eip-8',
    status: EIPState.Final,
    activeHardforks: getHardforksFrom(MainnetHardfork.Homestead),
    deprecated: false,
  },
];

export const eips: EIP[] = [...homesteadEIPs];
