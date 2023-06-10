import { arbitrum as arbitrumMetadata } from '@wagmi/chains';
import { Chain } from '@/chains';
import { precompiles } from './vm/precompiles';
import { opcodes } from './vm/opcodes';

export const arbitrum: Chain = {
  metadata: arbitrumMetadata,
  precompiles,
  opcodes,
};
