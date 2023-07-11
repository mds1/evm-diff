import { caller as callerMainnet } from '@/chains/mainnet/vm/opcodes/environment/caller';
import { Opcode } from '@/types';

export const caller: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  ...callerMainnet,
  description:
    'If the transaction is an L1 ⇒ L2 transaction, and this is the initial call (rather than an internal transaction from one contract to another), then `msg.sender` is set to the aliased address of the address that triggered the L1 ⇒ L2 transaction. Otherwise, this opcode behaves normally.',
  references: [
    ...callerMainnet.references,
    {
      name: 'Differences between Arbitrum and Ethereum',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
    {
      name: 'Retryable ticket address aliasing',
      url: 'https://developer.arbitrum.io/arbos/l1-to-l2-messaging#address-aliasing',
    },
  ],
};
