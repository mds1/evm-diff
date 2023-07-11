import { caller as callerMainnet } from '@/chains/mainnet/vm/opcodes/environment/caller';
import { Opcode } from '@/types';

export const caller: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  ...callerMainnet,
  description:
    'The opcode works the same way it does on Ethereum for normal L2-to-L2 transactions; for L1-to-L2 "retryable ticket" transactions, it will return the L2 address alias of the L1 contract that triggered the message.',
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
