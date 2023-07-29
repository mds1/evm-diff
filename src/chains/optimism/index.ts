import { optimism as optimismMetadata } from '@wagmi/chains';
import { sortedArrayByField } from '@/lib/utils';
import { Chain } from '@/types';
import { signatureTypes } from './signatureTypes';
import { opcodes } from './vm/opcodes';
import { precompiles } from './vm/precompiles';
import { predeploys } from './vm/predeploys';

export const optimism: Chain = {
  metadata: optimismMetadata,
  precompiles,
  predeploys,
  signatureTypes: sortedArrayByField(signatureTypes, 'prefixByte'),
  opcodes: sortedArrayByField(opcodes, 'number'),
};
