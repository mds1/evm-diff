import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const mstore: Opcode = {
  number: 0x52,
  name: 'mstore',
  description: 'Save word to memory',
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
      description: 'The 32-bytes value to write in the memory',
    },
  ],
  examples: [
    {
      input: ['0', '0xFF'],
      memory: {
        before: '',
        after: '0x00000000000000000000000000000000000000000000000000000000000000FF',
      },
    },
    {
      input: ['1', '0xFF'],
      memory: {
        before: '',
        after: '0x0000000000000000000000000000000000000000000000000000000000000000FF',
      },
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z1v0wyz2v1w%27~yPUSH1%20z%2F%2F%20Example%20y%5CnwyMSTOREyv~0xFF~%01vwyz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    evmCodesOpcodesLink(0x52),
    '[evm.codes, Memory Expansion](https://www.evm.codes/about#memoryexpansion)',
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Memory, 27),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
