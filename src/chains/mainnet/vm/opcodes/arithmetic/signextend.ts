import { Hardforks, getHardforksFrom } from '@/lib/hardforks';
import { OpcodeGroups, ethSpecsOpcodeSrc, evmCodesOpcodesLink } from '@/lib/opcodes';
import { Opcode } from '@/types';

export const signextend: Opcode = {
  number: 0x0b,
  name: 'signextend',
  description: "Extend length of two's complement signed integer",
  minGas: 5,
  inputs: [
    { name: 'b', description: 'The size in byte minus 1 of the integer to sign extend' },
    { name: 'x', description: 'The integer value to sign extend' },
  ],
  outputs: [{ name: 'y', description: 'The integer result of the sign extend.' }],
  examples: [
    {
      input: ['0', '0xFF'],
      output: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    },
    { input: ['0', '0x7F'], output: '0x7F' },
  ],
  playgroundLink:
    'https://www.evm.codes/playground?unit=Wei&codeType=Mnemonic&code=%27z1~xFywwz2~x7y%27~wPUSH1%200z%2F%2F%20Example%20yF~wSIGNEXTENDw%5Cn%01wyz~_',
  errorCases: ['Not enough gas', 'Not enough values on the stack'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink('0b'),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(OpcodeGroups.Arithmetic, 329),
    },
  ],
  supportedHardforks: getHardforksFrom(Hardforks.Frontier),
};
