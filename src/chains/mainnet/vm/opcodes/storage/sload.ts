import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const sload: Opcode = {
  number: 0x54,
  name: 'sload',
  description: 'Load word from storage',
  minGas: 100,
  gasComputation: {
    staticGasCost: {
      expression: '0',
    },
    dynamicGasCost: {
      expression: '100 if the accessed address is warm, 2100 otherwise',
    },
  },
  inputs: [
    {
      name: 'key',
      description: 'The 32-byte key in storage',
    },
  ],
  outputs: [
    {
      name: 'value',
      description:
        'The 32-byte value corresponding to that key. 0 if that key was never written before',
    },
  ],
  examples: [
    {
      input: '0',
      output: '46',
      storage: {
        before: {
          '0': '46',
        },
        after: {
          '0': '46',
        },
      },
    },
    {
      input: '1',
      output: '0',
      storage: {
        before: {
          '0': '46',
        },
        after: {
          '0': '46',
        },
      },
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27wSet%20up%20thrstatez46z0~SSTOREy1z0vy2z1v~%27~%5Cnz~PUSH1%20y~~wExamplrw%2F%2F%20v~SLOADre%20%01rvwyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x54),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Storage, 32),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
