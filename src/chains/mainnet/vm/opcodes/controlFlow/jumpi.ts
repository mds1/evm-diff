import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const jumpi: Omit<Opcode, 'examples'> = {
  number: 0x57,
  name: 'jumpi',
  description: 'Conditionally alter the program counter',
  minGas: 10,
  inputs: [
    {
      name: 'counter',
      description:
        'The byte offset in the deployed code where execution will continue from. Must be a JUMPDEST instruction.',
    },
    {
      name: 'b',
      description:
        'The program counter will be altered with the new value only if this value is different from 0. Otherwise, the program counter is simply incremented and the next instruction will be executed.',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27qFirstk%20noYjump%2C%20secondkw0%20XRY0w10z2~h4~W_z5w12z7~h9~Z0gINVALIDK11gZ2w_z13%27~%20%7Bprevious%20instruction%20occupiR%202%20bytR%7DgzXseYwgWq%2F%2F%20k%20example%20doRhQI%20%20Kg%5Cn_1%20ZQDESTz1Yt%20X%20qOffWPUSH_ResQJUMPK%20z%01KQRWXYZ_ghkqwz~_'
  ),
  errorCases: [
    'Not enough gas',
    'Not enough values on the stack',
    'Counter offset is not a JUMPDEST. The error is generated even if the JUMP would not have been done.',
  ],
  notes: [
    'The program counter (PC) is a byte offset in the deployed code. It indicates which instruction will be executed next. When an ADD is executed, for example, the PC is incremented by 1, since the instruction is 1 byte. The PUSH instructions are bigger than one byte, and so will increment the counter accordingly. The JUMPI instruction may alter the program counter, thus breaking the linear path of the execution to another point in the deployed code. It is used to implement functionalities like loops and conditions.',
  ],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x57),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Arithmetic, 70),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
