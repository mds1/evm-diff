import { Hardforks, getHardforksFrom } from '@/lib/hardforks';
import { OpcodeGroups, ethSpecsOpcodeSrc } from '@/lib/opcodes';
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
      url: 'https://www.evm.codes/#41?fork=shanghai',
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(OpcodeGroups.Block, 60),
    },
  ],
  supportedHardforks: getHardforksFrom(Hardforks.Frontier),
};
