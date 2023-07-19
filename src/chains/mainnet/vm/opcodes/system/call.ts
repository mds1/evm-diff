import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const call: Omit<Opcode, 'examples'> = {
  number: 0xf1,
  name: 'call',
  description: 'Message-call into an account',
  minGas: 100,
  gasComputation: {
    staticGasCost: {
      expression: '0',
    },
    dynamicGasCost: {
      expression:
        'memory_expansion_cost + code_execution_cost + address_access_cost + positive_value_cost + value_to_empty_account_cost',
      variables: [
        {
          name: 'memory_expansion_cost',
          description:
            'During a smart contract execution, memory can be accessed with opcodes. When an offset is first accessed (either read or write), memory may trigger an expansion, which costs gas. Memory expansion may be triggered when the byte offset (modulo 32) accessed is bigger than previous offsets. If a larger offset trigger of memory expansion occurs, the cost of accessing the higher offset is computed and removed from the total gas available at the current call context. Thus, only the additional bytes of memory must be paid for.',
          expression: 'memory_expansion_cost = new_memory_cost - last_memory_cost',
          variables: [
            {
              name: 'memory_cost',
              description: 'The memory cost function for a given machine state',
              expression: '(memory_size_word ** 2) / 512 + (3 * memory_size_word)',
            },
            {
              name: 'memory_size_word',
              description:
                'Number of (32-byte) words required for memory after the operation in question',
              expression: '(memory_byte_size + 31) / 32',
            },
            {
              name: 'memory_byte_size',
              description:
                'The highest referenced memory address after the operation in question (in bytes)',
            },
          ],
        },
        {
          name: 'code_execution_cost',
          description: 'The cost of the called code execution (limited by the gas parameter)',
        },
        {
          name: 'address_access_cost',
          description: '100 if the accessed address is warm, 2600 otherwise',
        },
        {
          name: 'positive_value_cost',
          description:
            '9000 if `value` is not 0. In this case there is also a call stipend that is given to make sure that a basic fallback function can be called. 2300 is thus removed from the cost, and also added to the gas input.',
        },
        {
          name: 'value_to_empty_account_cost',
          description:
            '25000 f `value` is not 0 and the address given points to an empty account. An account is empty if its balance is 0, its nonce is 0 and it has no code.',
        },
      ],
    },
  },
  inputs: [
    {
      name: 'gas',
      description:
        'The amount of gas to send to the sub context to execute. The gas that is not used by the sub context is returned to this one.',
    },
    {
      name: 'address',
      description: 'The account which context to execute',
    },
    {
      name: 'value',
      description: 'The value in wei to send to the account',
    },
    {
      name: 'argsOffset',
      description: 'The byte offset in the memory in bytes, the calldata of the sub context',
    },
    {
      name: 'argsSize',
      description: 'The byte size to copy (size of the calldata)',
    },
    {
      name: 'retOffset',
      description:
        'The byte offset in the memory in bytes, where to store the return data of the sub context',
    },
    {
      name: 'retSize',
      description: 'The byte size to copy (size of the return data)',
    },
  ],
  outputs: [
    {
      name: 'success',
      description: 'Returns 0 if the sub context reverted, 1 otherwise',
    },
  ],
  // TODO: Add an example when one will be provided on https://www.evm.codes/#f1?fork=shanghai
  playgroundLink: evmCodesPlaygroundLink(
    '%27breate%20aYontracWthatYreateVaQexceptioQif%20firsWword%20ofj%20isq_17qx67Z035Z757FE5BZ052Z86018F3gzMSTORE~17~15gzCREATEy%20parameterskqgggX6vynqjkVsuccessgg~32X7v%27~_1%20z%5Cnyzzball%20with%20nov_2qxFFFFzCALLq%200k%2C%20returnjYalldatag~0b%2F%2F%20C_zPUSHZ600Y%20cXggzDUPWt%20Vs%20Qn%20%01QVWXYZ_bgjkqvyz~_'
  ),
  errorCases: [
    'Not enough gas',
    'Not enough values on the stack',
    'The current execution context is from a STATICCALL and the value (stack index 2) is not 0 (since Byzantium fork)',
  ],
  notes: [
    'Creates a new sub context and execute the code of the given account, then resumes the current one. Note that an account with no code will return success as true.',
    'If the size of the return data is not known, it can also be retrieved after the call with the instructions RETURNDATASIZE and RETURNDATACOPY (since the Byzantium fork).',
    'From the Tangerine Whistle fork, gas is capped at all but one 64th (remaining_gas / 64) of the remaining gas of the current context. If a call tries to send more, the gas is changed to match the maximum allowed.',
  ],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0xf1),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.System, 329),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
