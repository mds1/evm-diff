import { EIP, EIPCategory } from '@/types/eip';
import { eip1559 as eip1559OnMainnet, eips as ethereumEIPs } from '../mainnet/eips';
import { ArbitrumHardfork, getArbitrumHardforksFrom } from './hardforks';

const hardforksFromArbOS11: string[] = getArbitrumHardforksFrom(ArbitrumHardfork.ArbOS11);
const eip1559OnArbitrum: EIP = {
  ...eip1559OnMainnet,
  activeHardforks: hardforksFromArbOS11,
  parameters: [],
  notes: [
    'EIP-1599 is not implemented on Arbitrum but Arbitrum implements an "exponential mechanism" which has been shown equivalent to Ethereum\'s EIP-1559 gas pricing mechanism.',
  ],
  references: [
    ...eip1559OnMainnet.references,
    'https://docs.arbitrum.io/inside-arbitrum-nitro#l2-gas-fees',
  ],
};

export const eips: EIP[] = ethereumEIPs
  .filter((eip) => {
    // Exclude consensus-related EIPs.
    return eip.category !== EIPCategory.Consensus;
  })
  .map((eip) => {
    // EIPs modified by Optimism hard forks.
    if (eip.number === 1559) return eip1559OnArbitrum;
    return eip;
  });
