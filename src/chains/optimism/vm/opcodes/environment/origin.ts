import { Opcode } from '@/types';

export const origin: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x32,
  name: 'origin',
  description:
    'If the transaction is an L1 ⇒ L2 transaction, then `tx.origin` is set to the aliased address of the address that triggered the L1 ⇒ L2 transaction. Otherwise, this opcode behaves normally.',
  references: [
    {
      name: 'differences between Optimism and Ethereum',
      url: 'https://community.optimism.io/docs/developers/build/differences/#opcode-differences',
    },
    {
      name: 'aliased address',
      url: 'https://community.optimism.io/docs/developers/build/differences/#address-aliasing',
    },
  ],
};
