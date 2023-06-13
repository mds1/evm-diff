import { arbitrum as arbitrumMetadata } from '@wagmi/chains';
import { Chain } from '@/chains';
import { sortedArrayByField } from '@/lib/utils';
import { opcodes } from './vm/opcodes';
import { precompiles } from './vm/precompiles';

export const arbitrum: Chain = {
  metadata: arbitrumMetadata,
  precompiles,
  opcodes: sortedArrayByField(opcodes, 'number'),
};
