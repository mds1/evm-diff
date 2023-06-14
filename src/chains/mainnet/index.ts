import { mainnet as mainnetMetadata } from '@wagmi/chains';
import { sortedArrayByField } from '@/lib/utils';
import { Chain } from '@/types';
import { signatureTypes } from './signatureTypes';
import { opcodes } from './vm/opcodes';
import { precompiles } from './vm/precompiles';

export const mainnet: Chain = {
  metadata: mainnetMetadata,
  precompiles,
  signatureTypes: sortedArrayByField(signatureTypes, 'prefixByte'),
  opcodes: sortedArrayByField(opcodes, 'number'),
};
