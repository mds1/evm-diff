import { EIP, EIPCategory } from '@/types/eip';
import {
  eip4399 as eip1399OnMainnet,
  eip1559 as eip1559OnMainnet,
  eips as ethereumEIPs,
} from '../mainnet/eips';
import { OptimismHardfork, getOptimismHardforksFrom } from './hardforks';

const hardforksFromCanyon: string[] = getOptimismHardforksFrom(OptimismHardfork.Canyon);
const eip1559OnOptimism: EIP = {
  ...eip1559OnMainnet,
  activeHardforks: hardforksFromCanyon,
  parameters: [
    {
      name: 'INITIAL_BASE_FEE',
      value: 1000000000,
    },
    {
      name: 'BASE_FEE_MAX_CHANGE_DENOMINATOR',
      value: 250,
    },
    {
      name: 'ELASTICITY_MULTIPLIER',
      value: 6,
    },
  ],
  references: [
    ...eip1559OnMainnet.references,
    'https://docs.optimism.io/chain/differences#eip-1559-parameters',
  ],
};

const eip4399OnOptimism: EIP = {
  ...eip1399OnMainnet,
  notes: [
    "PREVRANDAO returns the random output of the L1 beacon chain's randomness oracle. This value lags behind the L1 block's prevrandao value by approximately 5 L1 blocks, and is updated when the `L1BlockInfo` predeploy is updated.",
  ],
};

export const eips: EIP[] = ethereumEIPs
  .filter((eip) => {
    // Exclude consensus-related EIPS.
    return eip.category !== EIPCategory.Consensus;
  })
  .map((eip) => {
    // EIPs modified by Optimism hard forks.
    if (eip.number === 1559) return eip1559OnOptimism;
    if (eip.number == 4399) return eip4399OnOptimism;
    return eip;
  });
