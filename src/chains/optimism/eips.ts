import { EIP, EIPState } from '@/types/eip';
import { eip1559 as eip1559OnEthereum, eips as ethereumEIPs } from '../mainnet/eips';
import { MainnetHardfork, getHardforksFrom } from '../mainnet/hardforks';

const eip1559OnOptimism: EIP = {
  ...eip1559OnEthereum,
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

const hardforksFromShanghai: string[] = getHardforksFrom(MainnetHardfork.Shanghai);
const eip6049: EIP = {
  number: 6049,
  title: 'Deprecate SELFDESTRUCT',
  status: EIPState.Final,
  activeHardforks: hardforksFromShanghai,
  references: [
    'https://eips.ethereum.org/EIPS/eip-6049',
    'https://github.com/ethereum-optimism/optimism/blob/develop/specs/superchain-upgrades.md#canyon',
  ],
};

export const eips = ethereumEIPs
  .map((eip) => {
    // EIPs present on Ethereum but modified on Optimism.
    if (eip.number === 1559) return eip1559OnOptimism;
    return eip;
  })
  .concat(
    // EIPs present on Optimism but not on Ethereum.
    eip6049
  );
