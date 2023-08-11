import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import { CURRENT_MAINNET_HARDFORK } from '@/lib/constants';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode, Variable } from '@/types';

const generateIgnoredValues = (n: number): Variable[] => {
  const alphabet = 'abcdefghijklmno';
  if (n > alphabet.length) {
    throw new Error('Error while generating the ignored values for the dup opcode');
  }
  const array: Variable[] = [];
  for (let i = 0; i < n; i++) {
    const v: Variable = {
      name: alphabet[i],
      description: 'An ignored value',
    };
    array.push(v);
  }
  return array;
};

const swap = (n: number): Opcode => {
  if (n < 1 || n > 16) {
    throw new Error('Swap number must be between 1 and 16');
  }
  const number = 0x8f + n;
  const description = `Exchange 1st and ${
    n == 1 ? '2nd' : n == 2 ? '3rd' : `${n + 1}th`
  } stack items`;
  const ignoredValues: Variable[] = n > 1 ? generateIgnoredValues(n - 1) : [];
  const zeros: string[] = n > 1 ? Array(n - 1).fill('0') : [];
  return {
    number,
    name: `swap${n}`,
    description,
    minGas: 3,
    inputs: [
      {
        name: 'value_1',
        description: 'The value to swap',
      },
      ...ignoredValues,
      {
        name: 'value_2',
        description: 'The other value to swap',
      },
    ],
    outputs: [
      {
        name: 'value_2',
        description: 'The swapped value',
      },
      ...ignoredValues,
      {
        name: 'value_1',
        description: 'The other swapped value',
      },
    ],
    examples: [
      {
        input: ['1', ...zeros, '2'],
        output: ['2', ...zeros, '1'],
      },
    ],
    // TODO: playgroundLink: evmCodesPlaygroundLink(`%27xSet%20state${'FF'.repeat(n)}%5Cn~%27~PUSH${n}%200%01~_`),
    playgroundLink: evmCodesPlaygroundLink(
      '%27xet%20state~2zzzzzv1yyxwapySWAP14%27~yPUSH1%20v0y%5Cnx%2F%2F%20Svz~0~%01vxyz~_'
    ),
    errorCases: ['Not enough gas', 'Not enough values on the stack'],
    references: [
      evmCodesOpcodesLink(number),
      ethSpecsOpcodeSrc(CURRENT_MAINNET_HARDFORK, OpcodeGroup.Stack, 196 + n),
    ],
    supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
  };
};

const createSwapOpcodes = (start: number, end: number): Record<number, Opcode> => {
  const opcodes: Record<number, Opcode> = {};
  for (let i = start; i <= end; i++) {
    const swap_i = swap(i);
    opcodes[swap_i.number] = swap_i;
  }
  return opcodes;
};

export const opcodes = createSwapOpcodes(1, 16);
