import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const gasprice: Opcode = {
  number: 0x3a,
  name: 'gasprice',
  description: 'Get price of gas in current environment',
  minGas: 2,
  outputs: [
    {
      name: 'price',
      description: 'The gas price in wei per gas',
    },
  ],
  examples: [
    {
      output: '10',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink('%27GASPRICE%27_'),
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x3a),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Environment, 301),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
