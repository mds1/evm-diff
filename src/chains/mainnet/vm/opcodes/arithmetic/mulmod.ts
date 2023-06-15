import { Hardforks, getHardforksFrom } from '@/lib/hardforks';
import { OpcodeGroups, ethSpecsOpcodeSrc } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const mulmod: Opcode = {
  number: 0x09,
  name: 'mulmod',
  description: 'Modulo multiplication operation',
  minGas: 8,
  inputs: [
    { name: 'a', description: 'The first integer value to multiply' },
    { name: 'b', description: 'The second integer value to multiply' },
    { name: 'N', description: 'The integer denominator' },
  ],
  outputs: [
    {
      name: '(a + b) % N',
      description:
        'The integer result of the multiplication followed by a modulo. If the denominator is 0, the result will be 0.',
    },
  ],
  examples: [
    { input: ['10', '10', '8'], output: '4' },
    {
      input: [
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
        '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
        '12',
      ],
      output: '9',
    },
  ],
  playgroundLink:
    'https://www.evm.codes/playground?unit=Wei&codeType=Mnemonic&code=%27y1v8v10v10twwy2v12usust%27~rrrrzwPUSHy%2F%2F%20Example%20w%5Cnvz1%20uz32%200xstwMULMODs~~~~rFF%01rstuvwyz~_',
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  notes: ['All intermediate calculations of this operation are not subject to the 2**256 modulo.'],
  references: [
    {
      name: 'evm.codes',
      url: 'https://www.evm.codes/#09?fork=shanghai',
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(OpcodeGroups.Arithmetic, 265),
    },
  ],
  supportedHardforks: getHardforksFrom(Hardforks.Frontier),
};
