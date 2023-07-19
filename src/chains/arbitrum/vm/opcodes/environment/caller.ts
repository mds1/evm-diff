import { caller as baseOpcode } from '@/chains/optimism/vm/opcodes/environment/caller';
import { Opcode } from '@/types';

const { references: _references, ...opcode } = baseOpcode;
export const caller: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  references: [
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
