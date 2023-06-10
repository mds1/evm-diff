import { mainnet as mainnetMetadata } from '@wagmi/chains';
import { Chain } from '@/chains';
import { precompiles } from './vm/precompiles';
import { opcodes } from './vm/opcodes';

export const mainnet: Chain = {
  metadata: mainnetMetadata,
  precompiles,
  opcodes,
};
