import { Hardforks, getHardforksFrom } from '@/lib/hardforks';
import { OpcodeGroups, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const div: Opcode = {
  number: 0x04,
  name: 'div',
  description: 'Multiplication operation',
  minGas: 5,
  inputs: [
    { name: 'a', description: 'The integer numerator' },
    { name: 'b', description: 'The integer denominator' },
  ],
  outputs: [
    {
      name: 'a // b',
      description:
        'The integer result of the integer division. If the denominator is 0, the result will be 0.',
    },
  ],
  examples: [
    { input: ['10', '10'], output: '1' },
    { input: ['1', '2'], output: '0' },
  ],
  playgroundLink:
    'https://www.evm.codes/playground?unit=Wei&codeType=Mnemonic&code=%27z1~10~10wyyz2~2~1w%27~yPUSH1%20z%2F%2F%20Example%20y%5CnwyDIV%01wyz~_',
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink('04'),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(OpcodeGroups.Arithmetic, 111),
    },
  ],
  supportedHardforks: getHardforksFrom(Hardforks.Frontier),
};
