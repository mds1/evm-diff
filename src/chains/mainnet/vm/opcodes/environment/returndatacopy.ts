import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const returndatacopy: Opcode = {
  number: 0x3e,
  name: 'returndatacopy',
  description: 'Copy output data from the previous call to memory',
  minGas: 3,
  gasComputation: {
    staticGasCost: {
      expression: '3',
    },
    dynamicGasCost: {
      expression: '3 * minimum_word_size + memory_expansion_cost',
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
      ],
    },
  },
  inputs: [
    {
      name: 'destOffset',
      description: 'The byte offset in the memory where the result will be copied',
    },
    {
      name: 'offset',
      description: 'The byte offset in the return data from the last executed sub context to copy',
    },
    {
      name: 'size',
      description: 'The byte size to copy',
    },
  ],
  examples: [
    {
      input: ['0', '0', '32'],
      returndata: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      memory: {
        before: '',
        after: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      },
    },
    {
      input: ['32', '31', '1'],
      returndata: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      memory: {
        before: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
        after: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      },
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27jCKVthat%20cK(wich%20return-32%20*Z7F7ggggggggggFJ_Z*6Q527*F6Q526020.!_Zq06020526029.00~64_Breatef(withfVcod)above~77JJzCREATE%20jPutsfnew%20(addres-onfstackBallfdeployed%20XJJJJzDUP584%200xg*zSTATICCALLBlearfstackzPOPzPOPBlearfmemoryJJ_J!_J~64_zG1!JJWG2~1~31!W%27~81%20z%5CnqQQQj%2F%2F%20g***f%20th)_zMSTOREZ832%200xXcontractWzRETURNDATACOPYzVconstructor%20Q000Kreate-a%20J~0GzjExampl)BzzjC8zPUSH.6QF3qqqq-s%20*FF)e%20(X%20!~32%01!()*-.8BGJKQVWXZ_fgjqz~_'
  ),
  errorCases: [
    'Not enough gas',
    'Not enough values on the stack',
    'The addition offset + size overflows',
    'The result of `offset` plus `size` is larger than RETURNDATASIZE.',
  ],
  notes: ['A sub context can be created with CALL, CALLCODE, DELEGATECALL or STATICCALL'],
  references: [
    evmCodesOpcodesLink(0x3e),
    'https://www.evm.codes/about#memoryexpansion',
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 406),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Byzantium),
};
