import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const jump: Omit<Opcode, 'examples'> = {
  number: 0x56,
  name: 'jump',
  description: 'Alter the program counter',
  minGas: 8,
  inputs: [
    {
      name: 'counter',
      description:
        'The byte offset in the deployed code where execution will continue from. Must be a JUMPDEST instruction.',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27wWZjump%20overqinvalid%20and%20jusXgoYoqpushk4x0_%20%20%20x2%20%7Bprevious%20instruction%20occupies%202%20bytes%7DzINVALIDx3_DEST~4k1x5%27~%20wOffseXz%5Cnx%20~w%2F%2F%20qYhZkzPUSH1%20_zJUMPZe%20Y%20tXt%20%01XYZ_kqwxz~_'
  ),
  errorCases: [
    'Not enough gas',
    'Not enough values on the stack',
    'Counter offset is not a JUMPDEST. The error is generated even if the JUMP would not have been done.',
  ],
  notes: [
    'The program counter (PC) is a byte offset in the deployed code. It indicates which instruction will be executed next. When an ADD is executed, for example, the PC is incremented by 1, since the instruction is 1 byte. The PUSH instructions are bigger than one byte, and so will increment the counter accordingly. The JUMP instruction alters the program counter, thus breaking the linear path of the execution to another point in the deployed code. It is used to implement functionalities like functions.',
  ],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x56),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Arithmetic, 45),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
