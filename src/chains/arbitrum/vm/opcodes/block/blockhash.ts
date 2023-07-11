import { blockhash as blockhashMainnet } from '@/chains/mainnet/vm/opcodes/block/blockhash';
import { Opcode } from '@/types';

export const blockhash: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> =
  {
    ...blockhashMainnet,
    description:
      'Return a cryptographically insecure, pseudo-random hash for `x` within the range `block.number - 256 <= x < block.number`. If `x` is outside of this range, `blockhash(x)` will return 0. This includes `blockhash(block.number)`, which always returns 0 just like on Ethereum. The hashes returned do not come from L1.',
    references: [
      ...blockhashMainnet.references,
      {
        name: 'Differences between Arbitrum and Ethereum opcodes',
        url: 'https://developer.arbitrum.io/solidity-support',
      },
    ],
  };
