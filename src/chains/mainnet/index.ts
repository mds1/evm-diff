import { mainnet as mainnetMetadata } from '@wagmi/chains';
import { sortedArrayByField, sortedArrayByFields } from '@/lib/utils';
import { Chain } from '@/types';
import { accountTypes } from './accountTypes';
import { deployedContracts } from './deployedContracts';
import { mempools } from './mempools';
import { consensusNodes } from './nodes/consensus';
import { executionNodes } from './nodes/execution';
import { signatureTypes } from './signatureTypes';
import { opcodes } from './vm/opcodes';
import { precompiles } from './vm/precompiles';
import { predeploys } from './vm/predeploys';

export const mainnet: Chain = {
  metadata: mainnetMetadata,
  precompiles,
  predeploys,
  signatureTypes: sortedArrayByField(signatureTypes, 'prefixByte'),
  accountTypes: sortedArrayByField(accountTypes, 'name'),
  opcodes: sortedArrayByField(opcodes, 'number'),
  mempools: sortedArrayByField(mempools, 'name'),
  deployedContracts: sortedArrayByFields(deployedContracts, ['kind', 'name']),
  executionNodes,
  consensusNodes,
};
