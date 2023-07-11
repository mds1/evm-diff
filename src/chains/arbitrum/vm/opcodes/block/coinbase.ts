import { coinbase as coinbaseMainnet } from '@/chains/mainnet/vm/opcodes/block/coinbase';
import { Opcode } from '@/types';

export const coinbase: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  ...coinbaseMainnet,
  description: 'Returns zero.',
  references: [
    ...coinbaseMainnet.references,
    {
      name: 'Differences between Arbitrum and Ethereum opcodes',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
