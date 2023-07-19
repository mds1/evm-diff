import { push0 as baseOpcode } from '@/chains/optimism/vm/opcodes/stack/push0';
import { Opcode } from '@/types';

const { references: _references, ...opcode } = baseOpcode;
export const push0: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  references: [
    {
      name: 'Differences between Arbitrum and Ethereum opcodes',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
