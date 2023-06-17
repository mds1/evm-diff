import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import { OpcodeGroups, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const log0: Omit<Opcode, 'examples'> = {
  number: 0xa0,
  name: 'log0',
  description: 'Append log record with no topics',
  minGas: 375 * (1 + 0),
  gasComputation: {
    name: 'gas_cost',
    description: 'The gas cost of the function',
    expression: 'static_gas + dynamic_gas',
    variables: [
      {
        name: 'static_gas',
        description: 'The static gas cost of the function',
        expression: '375 * (1 + topic_count)',
        variables: [
          {
            name: 'topic_count',
            description: 'The number of topics in the log record',
            expression: '0',
          },
        ],
      },
      {
        name: 'dynamic_gas',
        description: 'The dynamic gas cost of the function',
        expression: '8 * size + memory_expansion_cost',
        variables: [
          {
            name: 'size',
            description: 'byte size to copy',
          },
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
        ],
      },
    ],
  },
  inputs: [
    {
      name: 'offset',
      description: 'The byte offset in the memory in bytes',
    },
    {
      name: 'size',
      description: 'The byte size to copy',
    },
  ],
  errorCases: [
    'Not enough gas',
    'Not enough values on the stack',
    'The current execution context is from a STATICCALL (since Byzantium fork)',
  ],
  notes: ['This instruction has no effect on the EVM state'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0xa0),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Log, 81),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
