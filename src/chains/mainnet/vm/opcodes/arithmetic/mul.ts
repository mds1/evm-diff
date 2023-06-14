import { ETH_SPECS_COMMIT_ID } from '@/lib/constants';
import { Opcode } from '@/types';

export const mul: Opcode = {
  number: 0x02,
  name: 'mul',
  description: 'Multiplication operation',
  minGas: 5,
  inputs: [
    { name: 'a', description: 'The first integer value to multiply' },
    { name: 'b', description: 'The second integer value to multiply' },
  ],
  outputs: [
    { name: 'a * b', description: 'The integer result of the multiplication modulo 2**256' },
  ],
  examples: [
    { input: ['10', '10'], output: '100' },
    {
      input: ['0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', '2'],
      output: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFE',
    },
  ],
  playgroundLink:
    'https://www.evm.codes/playground?unit=Wei&codeType=Mnemonic&code=%27y1z10z10twwy2v32%200xssssz2t%27~uuuuzv1%20y%2F%2F%20Example%20w%5CnvwPUSHuFFtwMULs~~%01stuvwyz~_',
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: 'https://www.evm.codes/#02?fork=shanghai',
    },
    {
      name: 'execution-specs',
      url: `https://github.com/ethereum/execution-specs/blob/${ETH_SPECS_COMMIT_ID}/src/ethereum/shanghai/vm/instructions/arithmetic.py#L84`,
    },
  ],
};
