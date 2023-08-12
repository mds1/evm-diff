import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const chainid: Opcode = {
  number: 0x46,
  name: 'chainid',
  description: 'Get the chain ID',
  minGas: 2,
  outputs: [
    {
      name: 'chainId',
      description: 'The chain id of the network',
    },
  ],
  examples: [
    {
      output: '1',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink('%27CHAINID%27_'),
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    evmCodesOpcodesLink(0x46),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Block, 222),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Istanbul),
};
