import { Opcode } from '@/types';

export const push0: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  number: 0x5f,
  name: 'push0',
  description:
    'OPCODE push0 is not yet supported, but will soon be available. This means that solidity version 0.8.20 or higher can only be used with an evm-version lower than the default shanghai (see instructions here to change that parameter in solc, or here to set the solidity or evmVersion configuration parameters in hardhat). Versions up to 0.8.19 (included) are fully compatible.',
  references: [
    {
      name: 'differences between Arbitrum and Ethereum opcodes',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
