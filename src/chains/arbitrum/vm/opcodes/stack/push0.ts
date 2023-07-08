import { Opcode } from '@/types';

export const push0: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x5f,
  name: 'push0',
  description:
    'The opcode not supported yet, but will be added in a hardfork. This means you cannot yet use Solidity 0.8.20 or later with an `evm_version` of Shanghai.',
  references: [
    {
      name: 'Differences between Arbitrum and Ethereum opcodes',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
