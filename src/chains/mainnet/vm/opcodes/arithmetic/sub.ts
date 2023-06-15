import { Hardforks, getHardforksFrom } from '@/lib/hardforks';
import { OpcodeGroups, ethSpecsOpcodeSrc } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const sub: Opcode = {
  number: 0x03,
  name: 'sub',
  description: 'Subtraction operation',
  minGas: 3,
  inputs: [
    { name: 'a', description: 'The first integer value' },
    { name: 'b', description: 'The second integer value to subtract to the first' },
  ],
  outputs: [{ name: 'a - b', description: 'The integer result of the subtraction modulo 2**256' }],
  examples: [
    { input: ['10', '10'], output: '0' },
    {
      input: ['0', '1'],
      output: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    },
  ],
  playgroundLink:
    'https://www.evm.codes/playground?unit=Wei&codeType=Mnemonic&code=%27z1~10~1wyyz2~1~w%27~yPUSH1%20z%2F%2F%20Example%20y%5Cnw0ySUB%01wyz~_',
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: 'https://www.evm.codes/#03?fork=shanghai',
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(OpcodeGroups.Arithmetic, 57),
    },
  ],
  supportedHardforks: getHardforksFrom(Hardforks.Frontier),
};
