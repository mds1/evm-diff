import { ETH_SPECS_COMMIT_ID } from '@/lib/constants';
import { Opcode } from '@/types';

export const add: Opcode = {
  number: 0x01,
  name: 'add',
  description: 'Addition operation',
  minGas: 3,
  inputs: [
    { name: 'a', description: 'The first integer value to add' },
    { name: 'b', description: 'The second integer value to add' },
  ],
  outputs: [{ name: 'a + b', description: 'The integer result of the addition modulo 2**256' }],
  examples: [{ input: ['10', '20'], output: '30' }],
  playgroundLink:
    'https://www.evm.codes/playground?unit=Wei&codeType=Mnemonic&code=%27y1z0z0twwy2v32%200xsssszt%27~uuuuzv1%201y%2F%2F%20Example%20w%5CnvwPUSHuFFtwADDs~~%01stuvwyz~_',
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: 'https://www.evm.codes/#01?fork=shanghai',
    },
    {
      name: 'execution-specs',
      url: `https://github.com/ethereum/execution-specs/blob/${ETH_SPECS_COMMIT_ID}/src/ethereum/shanghai/vm/instructions/arithmetic.py#L30`,
    },
  ],
};
