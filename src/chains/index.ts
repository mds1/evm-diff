import { arbitrum } from '@/chains/arbitrum';
import { mainnet } from '@/chains/mainnet';
import { optimism } from '@/chains/optimism';

export const chains = { arbitrum, mainnet, optimism };

export const getChainById = (chainId: string | number | bigint | undefined) => {
  if (!chainId) return undefined;
  chainId = BigInt(chainId);
  return Object.values(chains).find((chain) => BigInt(chain.metadata.id) === chainId);
};
