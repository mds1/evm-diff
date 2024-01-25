import { EIP, EIPCategory } from '@/types/eip';
import { eip1559 as eip1559OnEthereum, eips as ethereumEIPs } from '../mainnet/eips';
import { OptimismHardfork, getOptimismHardforksFrom } from './hardforks';

const hardforksFromCanyon: string[] = getOptimismHardforksFrom(OptimismHardfork.Canyon);
const eip1559OnOptimism: EIP = {
  ...eip1559OnEthereum,
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
    ...eip1559OnEthereum.references,
    'https://docs.optimism.io/chain/differences#eip-1559-parameters',
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
    return eip;
  });
