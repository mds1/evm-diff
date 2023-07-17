import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const create2: Omit<Opcode, 'examples'> = {
  number: 0xf5,
  name: 'create2',
  description: 'Create a new account with associated code at a predictable address',
  minGas: 32000,
  gasComputation: {
    staticGasCost: {
      expression: '32000',
    },
    dynamicGasCost: {
      expression:
        '6 * minimum_word_size + memory_expansion_cost + deployment_code_execution_cost + code_deposit_cost',
      description:
        'The difference with CREATE is an additional cost to hash the initialisation code before. The new contract address is added in the warm addresses.',
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
          name: 'deployment_code_execution_cost',
          description: 'The cost of whatever opcode is run to deploy the new contract',
        },
        {
          name: 'code_deposit_cost',
          description: 'The cost for storing the code of the new contract',
          expression: 'code_deposit_cost = 200 * deployed_code_size',
        },
      ],
    },
  },
  inputs: [
    {
      name: 'value',
      description: 'The value in wei to send to the new account',
    },
    {
      name: 'offset',
      description:
        'The byte offset in the memory in bytes, the initialisation code for the new account',
    },
    {
      name: 'size',
      description: 'The byte size to copy (size of the initialisation code)',
    },
    {
      name: 'salt',
      description: 'The 32-byte value used to create the new account at a deterministic address',
    },
  ],
  outputs: [
    {
      name: 'address',
      description: 'The address of the deployed contract, 0 if the deployment failed',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z0NLjannoXrecVQfparameters%2C%20becausliXgeneratesfaddressLz9N~1_~9Zyyz0v4%20FFYskW3%200x63FFFFFFFF60005260046000F3~0yMSTORE~2~13q%27~W%20zjVanYccounXQ%20y%5Cnv%20weiYnd%20q_Zle%20k%20codej%2F%2F%20Cf%20thlsaml_~0~0ZyCREATE2Y%20aXt%20WyPUSH1VreatlQwithNvnokL_qyy%01LNQVWXYZ_fjklqvyz~_?callValue=9'
  ),
  errorCases: [
    'Not enough gas',
    'Not enough values on the stack',
    'The current execution context is from a STATICCALL',
  ],
  notes: [
    'Equivalent to CREATE, except the salt allows the new contract to be deployed at a consistent, deterministic address.',
    "Should deployment succeed, the account's code is set to the return data resulting from executing the initialisation code.",
    'The destination address is calculated as follows: `address = keccak256(0xff + sender_address + salt + keccak256(initialisation_code))[12:]` where `initialisation_code = memory[offset:offset+size]`.',
    'Deployment can fail due to a contract already exists at the destination address, insufficient value to transfer, sub context reverted, insufficient gas to execute the initialisation code or all depth limit reached.',
    'Note that these failures only affect the return value and do not cause the calling context to revert (unlike the error cases below).',
  ],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0xf5),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.System, 180),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Constantinople),
};
