import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroups, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const coinbase: Opcode = {
  number: 0x41,
  name: 'coinbase',
  description: "Get the block's beneficiary address",
  minGas: 2,
  outputs: [{ name: 'address', description: "The miner's 20-byte address" }],
  examples: [{ output: '0x5B38Da6a701c568545dCfcB03FcB875f56beddC4' }],
  errorCases: ['Not enough gas.', 'Stack overflow.'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x41),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Block, 60),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
