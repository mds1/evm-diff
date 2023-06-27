import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const selfdestruct: Omit<Opcode, 'examples'> = {
  number: 0xff,
  name: 'selfdestruct',
  description: 'Halt execution and register account for later deletion',
  minGas: 5000,
  gasComputation: {
    staticGasCost: {
      expression: '5000',
    },
    dynamicGasCost: {
      expression: 'positive_balance + cold_address',
      variables: [
        {
          name: 'positive_balance',
          description:
            'If a positive balance is sent to an empty account, the dynamic gas is 25000. An account is empty if its balance is 0, its nonce is 0 and it has no code.',
        },
        {
          name: 'cold_address',
          description: 'If `address` is cold, there is an additional dynamic cost of 2600',
        },
      ],
    },
  },
  inputs: [
    {
      name: 'address',
      description:
        'The account to send the current balance to (see BALANCE or SELFBALANCE since Istanbul fork)',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27ureatekcvhagwrites%20inkslotq14bx64p1p055p052p5601BF3jzMSTORE~14~18jzCREATEzzuvries%20to%20modify%20state%2C%20failsjjjjzDUP5q2bxFFFFzSTATICCALL%27~q1%20z%5Cnvontracgtu%2F%2F%20CqzPUSHp600k%20a%20j~0gt%20b%200%01bgjkpquvz~_'
  ),
  errorCases: [
    'Not enough gas',
    'Not enough values on the stack',
    'The current execution context is from a STATICCALL (since Byzantium fork)',
  ],
  notes: [
    'The current account is registered to be destroyed, and will be at the end of the current transaction. The transfer of the current balance to the given account cannot fail. In particular, the destination account code (if any) is not executed, or, if the account does not exist, the balance is still added to the given address.',
  ],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0xff),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.System, 481),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Constantinople),
};
