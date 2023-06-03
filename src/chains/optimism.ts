import { optimism as optimismMetadata } from '@wagmi/chains';
import { Chain, Precompile } from '@/chains';
import { precompiles as mainnetPrecompiles } from '@/chains/mainnet';

const precompiles: Precompile[] = [
  ...mainnetPrecompiles,
  {
    address: '0x4200000000000000000000000000000000000006',
    name: 'WETH',
    description: "Wrapped Ether contract, behaves identically to mainnet's canonical WETH",
    references: [
      'https://help.optimism.io/hc/en-us/articles/4417948883611-What-is-ETH-WETH-How-do-they-interact-',
    ],
  },
];

export const optimism: Chain = {
  metadata: optimismMetadata,
  precompiles,
};
