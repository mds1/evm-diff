import { mainnet as mainnetMetadata } from '@wagmi/chains';
import { Chain } from '@/chains';
import { sortedArrayByField } from '@/lib/utils';
import { signatureTypes } from './signatureTypes';
import { precompiles } from './vm/precompiles';

export const mainnet: Chain = {
  metadata: mainnetMetadata,
  precompiles,
  signatureTypes: sortedArrayByField(signatureTypes, 'prefixByte'),
};
