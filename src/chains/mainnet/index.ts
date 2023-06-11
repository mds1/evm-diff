import { mainnet as mainnetMetadata } from '@wagmi/chains';
import { Chain } from '@/chains';
import { opcodes } from './vm/opcodes';
import { precompiles } from './vm/precompiles';

export const mainnet: Chain = {
  metadata: mainnetMetadata,
  precompiles,
  opcodes,
};
