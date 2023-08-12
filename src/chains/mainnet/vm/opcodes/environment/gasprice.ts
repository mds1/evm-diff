import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
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
    evmCodesOpcodesLink(0x3a),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 301),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
