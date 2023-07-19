import { MainnetHardfork, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const stop: Omit<Opcode, 'examples' | 'errorCases'> = {
  number: 0x00,
  name: 'stop',
  description: 'Halts execution',
  minGas: 0,
  notes: [
    'Exits the current context successfully. When a call is executed on an address with no code and the EVM tries to read the code data, the default value is returned, 0, which corresponds to this instruction and halts the execution.',
  ],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x00),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.ControlFlow, 23),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardfork.Frontier),
};
