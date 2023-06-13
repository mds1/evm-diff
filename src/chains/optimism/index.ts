import { optimism as optimismMetadata } from '@wagmi/chains';
import { Chain } from '@/chains';
import { sortedArrayByField } from '@/lib/utils';
import { opcodes } from './vm/opcodes';
import { precompiles } from './vm/precompiles';

export const optimism: Chain = {
  metadata: optimismMetadata,
  precompiles,
  opcodes: sortedArrayByField(opcodes, 'number'),
};
