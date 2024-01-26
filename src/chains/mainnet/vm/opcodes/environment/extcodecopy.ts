import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const extcodecopy: Opcode = {
  number: 0x3c,
  name: 'extcodecopy',
  description: "Copy an account's code to memory",
  minGas: 100,
  gasComputation: {
    staticGasCost: {
      expression: '0',
    },
    dynamicGasCost: {
      expression: '3 * minimum_word_size + memory_expansion_cost + address_access_cost',
      variables: [
        {
          name: 'minimum_word_size',
          description: 'The minimum size of the word to copy',
          expression: '(size + 31) / 32',
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
        {
          name: 'address_access_cost',
          description: 'The cost of accessing the address',
          expression: '100 if the accessed address is warm, 2600 otherwise',
        },
      ],
    },
  },
  inputs: [
    {
      name: 'address',
      description: 'The 20-byte address of the contract to query',
    },
    {
      name: 'destOffset',
      description: 'The byte offset in the memory where the result will be copied',
    },
    {
      name: 'offset',
      description: 'The byte offset in the code to copy',
    },
    {
      name: 'size',
      description: 'The byte size to copy',
    },
  ],
  examples: [
    {
      input: ['0x43a61f3f4c73ea0d444c5c1c1a8544067a86219b', '0', '0', '32'],
      code: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      memory: {
        before: '',
        after: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      },
    },
    {
      input: ['0x43a61f3f4c73ea0d444c5c1c1a8544067a86219b', '0', '31', '8'],
      code: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      memory: {
        before: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
        after: '0xFF00000000000000FFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      },
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27jCNQthat%20cNZwith%20.9%20aGcodeK7qqqqqqqqqIWK96_5260206_F3JJJJJ0!W(C-gZwithgQcodBabove~41IIzCREATE%20jPutsgnew%20ZaddresGongstack(Cleargmemory%20forge*esIIWI!WL1!IVL2~8~31V%27~)1%20z%5Cnq999Fj%2F%2F%20g%20thB_000Zcontract%20WzMSTOREVIzDUP4zEXTCODECOPYQconstructor%20N-Ga%20L(E*BK).0xJ___I~0Gs%20Be%209FF.32%20-reate*xampl)zPUSH(zzj!~32%01!()*-.9BGIJKLNQVWZ_gjqz~_'
  ),
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  notes: ['For out of bound bytes, 0s will be copied'],
  references: [
    evmCodesOpcodesLink(0x3c),
    '[evm.codes, Memory Expansion](https://www.evm.codes/about#memoryexpansion)',
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 350),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Frontier),
};
