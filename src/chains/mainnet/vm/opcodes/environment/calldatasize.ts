import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const calldatasize: Opcode = {
  number: 0x36,
  name: 'calldatasize',
  description: 'Get size of input data in current environment',
  minGas: 2,
  outputs: [
    {
      name: 'size ',
      description: 'The byte size of the calldata',
    },
  ],
  examples: [
    {
      output: '1',
      calldata: '0xFF',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink('%27CALLDATASIZE%27_&callData=0xFF'),
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x36),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 189),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
