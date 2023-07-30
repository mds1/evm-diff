import { prevrandao as baseOpcode } from '@/chains/mainnet/vm/opcodes/block/prevrandao';
import { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, notes: _notes, ...opcode } = baseOpcode;
export const prevrandao: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  outputs: [
    {
      name: 'random',
      description: "The random output of the L1 beacon chain's oracle from ~5 L1 blocks ago.",
    },
  ],
  description:
    "Returns the random output of the L1 beacon chain's randomness oracle. This value lags behind the L1 block's prevrandao value by about 5 L1 blocks, and is updated when the `L1BlockInfo` predeploy is updated.",
  references: [
    {
      name: 'Deriving the Transaction List',
      url: 'https://github.com/ethereum-optimism/optimism/blob/develop/specs/derivation.md#building-individual-payload-attributes',
    },
    {
      name: 'EVM Diff Issue #21',
      url: 'https://github.com/mds1/evm-diff/issues/21',
    },
  ],
};