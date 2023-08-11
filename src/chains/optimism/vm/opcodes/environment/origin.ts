import { origin as baseOpcode } from '@/chains/mainnet/vm/opcodes/environment/origin';
import { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, ...opcode } = baseOpcode;
export const origin: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  description:
    'If the transaction is an L1 ⇒ L2 transaction, then `tx.origin` is set to the aliased address of the address that triggered the L1 ⇒ L2 transaction. Otherwise, this opcode behaves normally.',
  outputs: [
    {
      name: 'address',
      description:
        'The 20-byte address of the sender of the transaction, or the aliased address for L1 ⇒ L2 transactions. It can only be an account without code.',
    },
  ],
  references: [
    'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
    'https://community.optimism.io/docs/developers/build/differences/#address-aliasing',
  ],
};
