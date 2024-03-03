import { EIP, EIPCategory } from '@/types/eip';
import {
  eip4399 as eip1399OnMainnet,
  eip1559 as eip1559OnMainnet,
  eip4895 as eip4895OnMainnet,
  eips as ethereumEIPs,
} from '../mainnet/eips';
import { ArbitrumHardfork, getArbitrumHardforksFrom } from './hardforks';

const hardforksFromArbOS11: string[] = getArbitrumHardforksFrom(ArbitrumHardfork.ArbOS11);
const eip1559OnArbitrum: EIP = {
  ...eip1559OnMainnet,
  activeHardforks: hardforksFromArbOS11,
  parameters: [],
  notes: [
    'EIP-1599 is not implemented on Arbitrum but Arbitrum implements an "exponential mechanism" which has been shown equivalent to Ethereum\'s EIP-1559 gas pricing mechanism.',
    'EIP-1559 is partially implemented with the following exceptions:',
    '- Target a gas per second ("speed limit") instead of block gas limit to account for the variable block time in Arbitrum.',
    '- Priority fee is not collected by the network even when nonzero value is specified.',
  ],
  references: [
    ...eip1559OnMainnet.references,
    'https://docs.arbitrum.io/inside-arbitrum-nitro#l2-gas-fees',
  ],
};

const eip4399OnArbitrum: EIP = {
  ...eip1399OnMainnet,
  notes: ['PREVRANDAO returns the constant 1 on Arbitrum.'],
  references: [...eip1399OnMainnet.references, 'https://developer.arbitrum.io/solidity-support'],
};

const eip4895OnArbitrum: EIP = {
  ...eip4895OnMainnet,
  notes: ['Arbitrum currently do not generate block with withdrawalsRoot.'],
  references: [
    ...eip4895OnMainnet.references,
    'https://github.com/mds1/evm-diff/pull/60#issuecomment-1926794404',
  ],
};

export const eips: EIP[] = ethereumEIPs
  .filter((eip) => {
    // Exclude consensus-related EIPs.
    return eip.category !== EIPCategory.Consensus;
  })
  .map((eip) => {
    // EIPs modified by Arbitrum hard forks.
    if (eip.number === 1559) return eip1559OnArbitrum;
    if (eip.number === 4399) return eip4399OnArbitrum;
    if (eip.number === 4895) return eip4895OnArbitrum;
    return eip;
  });
