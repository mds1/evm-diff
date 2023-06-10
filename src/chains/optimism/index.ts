import { optimism as optimismMetadata } from '@wagmi/chains';
import { Chain } from '@/types/chain';
import { opcodes } from './vm/opcodes';
import { precompiles } from './vm/precompiles';

export const optimism: Chain = {
  metadata: optimismMetadata,
  precompiles,
  opcodes,
};
