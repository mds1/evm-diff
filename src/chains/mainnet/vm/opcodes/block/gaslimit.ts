import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroup, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const gaslimit: Opcode = {
  number: 0x45,
  name: 'gaslimit',
  description: "Get the block's gas limit",
  minGas: 2,
  outputs: [
    {
      name: 'gasLimit',
      description: 'The current block gas limit',
    },
  ],
  examples: [
    {
      output: '0xffffffffffff',
    },
  ],
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x45),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Block, 190),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
