import { Opcode } from '@/types';

export const caller: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x33,
  name: 'caller',
  description:
    'If the transaction is an L1 ⇒ L2 transaction, and this is the initial call (rather than an internal transaction from one contract to another), the same address aliasing behavior applies.',
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
