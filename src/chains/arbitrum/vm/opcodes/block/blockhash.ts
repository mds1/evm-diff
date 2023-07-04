import { Opcode } from '@/types';

export const blockhash: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> =
  {
    number: 0x40,
    name: 'blockhash',
    description:
      '`blockhash(x)` returns a cryptographically insecure, pseudo-random hash for `x` within the range `block.number - 256 <= x < block.number`. If `x` is outside of this range, `blockhash(x)` will return 0. This includes `blockhash(block.number)`, which always returns 0 just like on Ethereum. The hashes returned do not come from L1.',
    references: [
      {
        name: 'differences between Arbitrum and Ethereum opcodes',
        url: 'https://developer.arbitrum.io/solidity-support',
      },
    ],
  };
