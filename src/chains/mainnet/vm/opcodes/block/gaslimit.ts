import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroups, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const gaslimit: Opcode = {
  number: 0x45,
  name: 'gaslimit',
  description: "Get the block's gas limit",
  minGas: 2,
  outputs: [{ name: 'gasLimit', description: 'The current block gas limit' }],
  examples: [{ output: '0xffffffffffff' }],
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x45),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Block, 190),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
