import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const keccak: Opcode = {
  number: 0x20,
  name: 'keccak',
  description: 'Compute Keccak-256 hash',
  minGas: 30,
  gasComputation: {
    staticGasCost: {
      expression: '30',
    },
    dynamicGasCost: {
      expression: '6 * minimum_word_size + memory_expansion_cost',
      variables: [
        {
          name: 'minimum_word_size',
          description: 'The minimum size of the word to hash',
          expression: '(size + 31) / 32',
        },
        {
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
      ],
    },
  },
  inputs: [
    {
      name: 'offset',
      description: 'The byte offset in the memory',
    },
    {
      name: 'size',
      description: 'The byte size to read in the memory',
    },
  ],
  outputs: [
    {
      name: 'hash',
      description: 'The Keccak-256 hash of the given data in memory',
    },
  ],
  examples: [
    {
      input: ['0', '4'],
      output: '0x29045A592007D0C246EF02C2223570DA9522D0CF0F73282C79A1BC8F0BB2C238',
      memory: {
        before: '0xFFFFFFFF',
        after: '0xFFFFFFFF',
      },
    },
    {
      input: ['0xFF', '0'],
      output: '0',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27sPutkrequired%20valugin%20memoryj32%200xFFFFFFFFffffz0wMSTOREwwsCallkopcodez4z0wSHA3%27~0000000zj1%20w%5Cns%2F%2F%20k%20thgjwPUSHge%20f~~%01fgjkswz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x20),
    },
    {
      name: 'memory expansion',
      url: 'https://www.evm.codes/about#memoryexpansion',
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Keccak, 30),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
