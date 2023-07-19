import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import { CURRENT_MAINNET_HARDFORK } from '@/lib/constants';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

const push = (n: number): Opcode => {
  if (n < 1 || n > 32) {
    throw new Error('Push number must be between 1 and 32');
  }
  const number = 0x5f + n;
  return {
    number,
    name: `push${n}`,
    description: `Place ${n} byte item on stack`,
    minGas: 3,
    outputs: [
      {
        name: 'value',
        description: 'The pushed value, aligned to the right (put in the lowest significant bytes)',
      },
    ],
    examples: [
      {
        output: [`0x${'00'.repeat(n)}"`, `0x${'FF'.repeat(n)}"`],
      },
    ],
    playgroundLink: evmCodesPlaygroundLink(`%27~x${'FF'.repeat(n)}%5Cn~%27~PUSH${n}%200%01~_`),
    errorCases: ['Not enough gas', 'Stack overflow'],
    notes: [
      'The new value is put on top of the stack, incrementing all the other value indices. The values for a specific opcode thus have to be pushed in reverse order of the stack. For example, with MSTORE, the first value pushed would have to be value, and then offset.',
    ],
    references: [
      {
        name: 'evm.codes',
        url: evmCodesOpcodesLink(number),
      },
      {
        name: 'execution-specs',
        url: ethSpecsOpcodeSrc(CURRENT_MAINNET_HARDFORK, OpcodeGroup.Stack, 146 + n),
      },
    ],
    supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
  };
};

const createPushOpcodes = (start: number, end: number): Record<number, Opcode> => {
  let opcodes: Record<number, Opcode> = {};
  for (let i = start; i <= end; i++) {
    const push_i = push(i);
    opcodes[push_i.number] = push_i;
  }
  return opcodes;
};

export const opcodes = createPushOpcodes(1, 32);

export const push0: Opcode = {
  number: 0x5f,
  name: 'push0',
  description: 'Place value 0 on stack',
  minGas: 2,
  outputs: [
    {
      name: 'value',
      description: 'The pushed value, equal to 0',
    },
  ],
  examples: [
    {
      output: ['0x00'],
    },
  ],
  errorCases: ['Not enough gas', 'Stack overflow'],
  notes: [
    'The new value is put on top of the stack, incrementing all the other value indices. The values for a specific opcode thus have to be pushed in reverse order of the stack. For example, with MSTORE, the first value pushed would have to be value, and then offset.',
  ],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x5f),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(CURRENT_MAINNET_HARDFORK, OpcodeGroup.Stack, 146),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Shanghai),
};
