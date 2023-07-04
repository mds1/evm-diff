import { Opcode } from '@/types';

export const caller: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x33,
  name: 'caller',
  description:
    'msg.sender works the same way it does on Ethereum for normal L2-to-L2 transactions; for L1-to-L2 "retryable ticket" transactions, it will return the L2 address alias of the L1 contract that triggered the message.',
  references: [
    {
      name: 'differences between Arbitrum and Ethereum',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
    {
      name: 'retryable ticket address aliasing',
      url: 'https://developer.arbitrum.io/arbos/l1-to-l2-messaging#address-aliasing',
    },
  ],
};
