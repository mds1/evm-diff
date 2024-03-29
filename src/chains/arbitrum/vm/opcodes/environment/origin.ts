import { origin as baseOpcode } from '@/chains/optimism/vm/opcodes/environment/origin';
import { Opcode } from '@/types';

const { references: _references, ...opcode } = baseOpcode;
export const origin: Omit<Opcode, 'supportedHardforks'> = {
  ...opcode,
  references: [
    '[Arbitrum Differences from Solidity on Ethereum](https://developer.arbitrum.io/solidity-support)',
    '[L1 to L2 Messaging, Address Aliasing](https://developer.arbitrum.io/arbos/l1-to-l2-messaging#address-aliasing)',
  ],
};
