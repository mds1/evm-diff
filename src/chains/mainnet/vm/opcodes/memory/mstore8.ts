import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const mstore8: Opcode = {
  number: 0x53,
  name: 'mstore8',
  description: 'Save byte to memory',
  minGas: 3,
  gasComputation: {
    staticGasCost: {
      expression: '3',
    },
    dynamicGasCost: {
      name: 'Memory expansion',
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
  },
  inputs: [
    {
      name: 'offset',
      description: 'The offset in the memory in bytes',
    },
    {
      name: 'value',
      description:
        'The 1-byte value to write in the memory (the least significant byte of the 32-byte stack value).',
    },
  ],
  examples: [
    {
      input: ['0', '0xFFFF'],
      memory: {
        before: '',
        after: '0xFF',
      },
    },
    {
      input: ['1', '0xFF'],
      memory: {
        before: '0xFF',
        after: '0xFFFF',
      },
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1v2%200xFFFFy0w~z2y0xFFy1w%27~%5Cnz%2F%2F%20Example%20yv1%20w~MSTORE8~v~PUSH%01vwyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x53),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Memory, 58),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
