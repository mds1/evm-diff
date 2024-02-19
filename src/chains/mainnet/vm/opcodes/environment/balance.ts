import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const balance: Opcode = {
  number: 0x31,
  name: 'balance',
  description: 'Get balance of given account',
  minGas: 100,
  gasComputation: {
    staticGasCost: {
      expression: '0',
    },
    dynamicGasCost: {
      expression: '100 if the accessed address is warm, 2600 otherwise',
    },
  },
  inputs: [
    {
      name: 'address',
      description: 'The 20-byte address of the account to check',
    },
  ],
  outputs: [
    {
      name: 'balance',
      description:
        "The balance of the given account in wei. Returns 0 if the account doesn't exist.",
    },
  ],
  examples: [
    {
      input: '0x9bbfed6889322e016e0a02ee459d306fc19545d8',
      output: '125985',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27%2F%2F%20Read%20current%20contract%20balance%5CnADDRESS%5CnBALANCE%27_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    evmCodesOpcodesLink(0x31),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 63),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
