import { push0 as baseOpcode } from '@/chains/mainnet/vm/opcodes/stack/push';
import { Opcode } from '@/types';

const { supportedHardforks: _supportedHardforks, ...opcode } = baseOpcode;
export const push0: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  description:
    'The opcode is not supported yet, but will be added in a future hardfork. This means you cannot yet use Solidity 0.8.20 or later with an `evm_version` of Shanghai.',
  references: [
    '[Arbitrum Differences from Solidity on Ethereum](https://developer.arbitrum.io/solidity-support)',
  ],
};
