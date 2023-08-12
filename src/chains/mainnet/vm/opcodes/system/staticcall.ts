import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroup, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const staticcall: Omit<Opcode, 'examples' | 'playgroundLink'> = {
  number: 0xfa,
  name: 'staticcall',
  description: 'Static message-call into an account',
  minGas: 100,
  gasComputation: {
    staticGasCost: {
      expression: '0',
    },
    dynamicGasCost: {
      expression: 'memory_expansion_cost + code_execution_cost + address_access_cost',
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
  // TODO: Add an example and a playground link when one will be provided on https://www.evm.codes/#f1?fork=shanghai
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  notes: [
    'Creates a new sub context and execute the code of the given account, then resumes the current one. Note that an account with no code will return success as true (1).',
    'This instructions is equivalent to CALL, except that it does not allow any state modifying instructions or sending ETH in the sub context. The disallowed instructions are CREATE, CREATE2, LOG0, LOG1, LOG2, LOG3, LOG4, SSTORE, SELFDESTRUCT and CALL if the value sent is not 0.',
    'If the size of the return data is not known, it can also be retrieved after the call with the instructions RETURNDATASIZE and RETURNDATACOPY (since the Byzantium fork).',
    'From the Tangerine Whistle fork, gas is capped at all but one 64th (remaining_gas / 64) of the remaining gas of the current context. If a call tries to send more, the gas is changed to match the maximum allowed.',
  ],
  references: [
    evmCodesOpcodesLink(0xfa),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.System, 594),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Byzantium),
};
