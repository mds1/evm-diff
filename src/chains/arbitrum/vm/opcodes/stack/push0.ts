import { push0 as push0Mainnet } from '@/chains/mainnet/vm/opcodes/stack/push';
import { Opcode } from '@/types';

export const push0: Omit<Opcode, 'minGas' | 'examples' | 'errorCases' | 'supportedHardforks'> = {
  ...push0Mainnet,
  description:
    'The opcode not supported yet, but will be added in a hardfork. This means you cannot yet use Solidity 0.8.20 or later with an `evm_version` of Shanghai.',
  references: [
    ...push0Mainnet.references,
    {
      name: 'Differences between Arbitrum and Ethereum opcodes',
      url: 'https://developer.arbitrum.io/solidity-support',
    },
  ],
};
