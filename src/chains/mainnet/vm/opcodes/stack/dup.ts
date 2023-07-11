import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import { CURRENT_MAINNET_HARDFORK } from '@/lib/constants';
import {
  OpcodeGroups,
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

const dup = (n: number): Opcode => {
  if (n < 1 || n > 16) {
    throw new Error('Dup number must be between 1 and 16');
  }
  const number = 0x7f + n;
  const description = `Duplicate ${
    n == 1 ? '1st' : n == 2 ? '2nd' : n == 3 ? '3rd' : `${n}th`
  } stack item`;
  const ignoredValues: Variable[] = n > 1 ? generateIgnoredValues(n - 1) : [];
  const zeros: string[] = n > 1 ? Array(n - 1).fill('0') : [];
  return {
    number,
    name: `dup${n}`,
    description,
    minGas: 3,
    inputs: [
      ...ignoredValues,
      {
        name: 'value',
        description: 'The value to duplicate',
      },
    ],
    outputs: [
      {
        name: 'value',
        description: 'The duplicated value',
      },
      ...ignoredValues,
      {
        name: 'value',
        description: 'The original value',
      },
    ],
    examples: [
      {
        input: [...zeros, '1'],
        output: ['1', ...zeros, '1'],
      },
    ],
    // TODO: playgroundLink: evmCodesPlaygroundLink(`%27xSet%20state${'FF'.repeat(n)}%5Cn~%27~PUSH${n}%200%01~_`),
    playgroundLink: evmCodesPlaygroundLink(
      '%27zSet%20styPUSH1%201~~zDuplicyDUP1%27~%5Cnz%2F%2F%20yate~%01yz~_'
    ),
    errorCases: ['Not enough gas', 'Not enough values on the stack', 'Stack overflow'],
    references: [
      {
        name: 'evm.codes',
        url: evmCodesOpcodesLink(number),
      },
      {
        name: 'execution-specs',
        url: ethSpecsOpcodeSrc(CURRENT_MAINNET_HARDFORK, OpcodeGroups.Stack, 179 + n),
      },
    ],
    supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
  };
};

const createDupOpcodes = (start: number, end: number): Record<number, Opcode> => {
  let opcodes: Record<number, Opcode> = {};
  for (let i = start; i <= end; i++) {
    const dup_i = dup(i);
    opcodes[dup_i.number] = dup_i;
  }
  return opcodes;
};

export const opcodes = createDupOpcodes(1, 16);
