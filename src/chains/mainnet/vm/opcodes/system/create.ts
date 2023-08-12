import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const create: Opcode = {
  number: 0xf0,
  name: 'create',
  description: 'Create a new account with associated code',
  minGas: 32000,
  gasComputation: {
    staticGasCost: {
      expression: '32000',
    },
    dynamicGasCost: {
      expression: 'memory_expansion_cost + deployment_code_execution_cost + code_deposit_cost',
      description: 'The new contract address is added in the warm addresses',
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
          name: 'deployment_code_execution_cost',
          description: 'The cost of whatever opcode is run to deploy the new contract',
        },
        {
          name: 'code_deposit_cost',
          description: 'The cost for storing the code of the new contract',
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
  ],
  outputs: [
    {
      name: 'address',
      description: 'The address of the deployed contract, 0 if the deployment failed',
    },
  ],
  examples: [
    {
      description: 'Create an account with 0 wei and no code',
      input: ['0', '0', '0'],
      output: '43a61f3f4c73ea0d444c5c1c1a8544067a86219b',
    },
    {
      description: 'Create an account with 9 wei and no code',
      input: ['0', '0', '9'],
      output: '3fa89944e11022fc67d12a9d2bf35ebe1164f7ef',
    },
    {
      description: 'Create an account with 0 wei and 4 FF as code',
      input: ['d', '0', '0'],
      memory: {
        before: '0000000000000000000000000000000000000063ffffffff6000526004601cf3',
        after: '0000000000000000000000000000000000000063ffffffff6000526004601cf3',
      },
      output: '230fc3fe9249c6f698bfefea56debde9e1de2934',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27z0q0f9q9f0y4%20FFmslk3%200x63FFFFFFFF6000526004601CF3jvMSTORE~13jjp%20%27~k%20z%2F%2F%20Createmnmccountgith%20ygeimnd%20v%5Cnqynoljj~pvCREATEm%20al%20codekvPUSH1j~0g%20wfpvvz%01fgjklmpqvyz~_&callValue=9'
  ),
  errorCases: [
    'Not enough gas',
    'Not enough values on the stack',
    'The current execution context is from a STATICCALL (since Byzantium fork)',
  ],
  notes: [
    'Creates a new contract. Enters a new sub context of the calculated destination address and executes the provided initialisation code, then resumes the current context.',
    "Should deployment succeed, the new account's code is set to the return data resulting from executing the initialisation code.",
    'The destination address is calculated as the rightmost 20 bytes (160 bits) of the Keccak-256 hash of the rlp encoding of the sender address followed by its nonce. That is: `address = keccak256(rlp([sender_address,sender_nonce]))[12:]`.',
    'Deployment can fail due to: insufficient value to send, sub context reverted, insufficient gas to execute the initialisation code or call depth limit reached.',
    'Note that these failures only affect the return value and do not cause the calling context to revert (unlike the error cases below).',
  ],
  references: [
    evmCodesOpcodesLink(0xf0),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.System, 125),
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Constantinople),
};
