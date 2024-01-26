import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroup, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const coinbase: Opcode = {
  number: 0x41,
  name: 'coinbase',
  description: "Get the block's beneficiary address",
  minGas: 2,
  outputs: [
    {
      name: 'address',
      description: "The miner's 20-byte address",
    },
  ],
  examples: [
    {
      output: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4',
    },
  ],
  errorCases: ['Not enough gas.', 'Stack overflow.'],
  references: [
    evmCodesOpcodesLink(0x41),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Block, 60),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
