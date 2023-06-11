import { arbitrum as arbitrumMetadata } from '@wagmi/chains';
import { Chain } from '@/chains';
import { opcodes } from './vm/opcodes';
import { precompiles } from './vm/precompiles';

export const arbitrum: Chain = {
  metadata: arbitrumMetadata,
  precompiles,
  opcodes,
};
