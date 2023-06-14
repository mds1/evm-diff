import { ETH_SPECS_COMMIT_ID } from '@/lib/constants';
import { Opcode } from '@/types';

export const addmod: Opcode = {
  number: 0x08,
  name: 'addmod',
  description: 'Modulo addition operation',
  minGas: 8,
  inputs: [
    { name: 'a', description: 'The first integer value to add' },
    { name: 'b', description: 'The second integer value to add' },
    { name: 'N', description: 'The integer denominator' },
  ],
  outputs: [
    {
      name: '(a + b) % N',
      description:
        'The integer result of the addition followed by a modulo. If the denominator is 0, the result will be 0.',
    },
  ],
  examples: [
    { input: ['10', '10', '8'], output: '4' },
    {
      input: ['0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF', '2', '2'],
      output: '1',
    },
  ],
  playgroundLink:
    'https://www.evm.codes/playground?unit=Wei&codeType=Mnemonic&code=%27y1z8z10z10vwwy2z2z2u32%200xssssv%27~ttttzu1%20y%2F%2F%20Example%20w%5CnvwADDMODuwPUSHtFFs~~%01stuvwyz~_',
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  notes: ['All intermediate calculations of this operation are not subject to the 2**256 modulo.'],
  references: [
    {
      name: 'evm.codes',
      url: 'https://www.evm.codes/#08?fork=shanghai',
    },
    {
      name: 'execution-specs',
      url: `https://github.com/ethereum/execution-specs/blob/${ETH_SPECS_COMMIT_ID}/src/ethereum/shanghai/vm/instructions/arithmetic.py#234`,
    },
  ],
};
