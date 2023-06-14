import { arbitrum as arbitrumMetadata } from '@wagmi/chains';
import { Chain } from '@/chains';
import { sortedArrayByField } from '@/lib/utils';
import { signatureTypes } from './signatureTypes';
import { precompiles } from './vm/precompiles';

export const arbitrum: Chain = {
  metadata: arbitrumMetadata,
  precompiles,
  signatureTypes: sortedArrayByField(signatureTypes, 'prefixByte'),
};
