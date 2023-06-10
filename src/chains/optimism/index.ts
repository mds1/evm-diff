import { optimism as optimismMetadata } from '@wagmi/chains';
import { Chain } from '@/chains';
import { precompiles } from './vm/precompiles';
import { opcodes } from './vm/opcodes';

export const optimism: Chain = {
  metadata: optimismMetadata,
  precompiles,
  opcodes,
};
