import { optimism as optimismMetadata } from '@wagmi/chains';
import { Chain } from '@/chains';
import { precompiles } from './vm/precompiles';

export const optimism: Chain = {
  metadata: optimismMetadata,
  precompiles,
};
