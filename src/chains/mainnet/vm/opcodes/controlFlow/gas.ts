import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const gas: Omit<Opcode, 'examples'> = {
  number: 0x5a,
  name: 'gas',
  description:
    'Get the amount of available gas, including the corresponding reduction for the cost of this instruction',
  minGas: 2,
  outputs: [
    {
      name: 'gas',
      description: 'The remaining gas (after this instruction).',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27GASyPUSH3%2021000zCosqof~transactionyGASLIMITzGaskhaqwjgivenko~context__zResulqis~amounqof%20gjused%20upko%20andbncluding~GASbnstruction%27~khe%20z%20%2F%2F%20y%5Cnqt%20k%20tjas%20b%20i_ySUB%01_bjkqyz~_'
  ),
  errorCases: ['Not enough gas', 'Stack overflow'],
  references: [
    evmCodesOpcodesLink(0x5a),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Arithmetic, 125),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
