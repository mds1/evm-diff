import { arbitrum as arbitrumMetadata } from '@wagmi/chains';
import { sortedArrayByField } from '@/lib/utils';
import { Chain } from '@/types';
import { accountTypes } from './accountTypes';
import { signatureTypes } from './signatureTypes';
import { opcodes } from './vm/opcodes';
import { precompiles } from './vm/precompiles';
import { predeploys } from './vm/predeploys';

export const arbitrum: Chain = {
  metadata: arbitrumMetadata,
  precompiles,
  predeploys,
  signatureTypes: sortedArrayByField(signatureTypes, 'prefixByte'),
  accountTypes: sortedArrayByField(accountTypes, 'name'),
  opcodes: sortedArrayByField(opcodes, 'number'),
  mempools: [],
};
