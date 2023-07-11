import { MainnetHardforks, getHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroups,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const calldataload: Opcode = {
  number: 0x35,
  name: 'calldataload',
  description: 'Get input data of current environment',
  minGas: 3,
  inputs: [
    {
      name: 'i',
      description: 'The byte offset in the calldata',
    },
  ],
  outputs: [
    {
      name: 'data[i]',
      description:
        'The 32-byte value starting from the given offset of the calldata. All bytes after the end of the calldata are set to 0.',
    },
  ],
  examples: [
    {
      input: '0',
      output: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
      calldata: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    },
    {
      input: '31',
      output: '0xFF00000000000000000000000000000000000000000000000000000000000000',
      calldata: '0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27~1w0yzz~2w31y%27~%2F%2F%20Example%20z%5CnyzCALLDATALOADwzPUSH1%20%01wyz~_&callData=0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFF'
  ),
  errorCases: ['Not enough gas', 'Not enough values on stack'],
  references: [
    {
      name: 'evm.codes',
      url: evmCodesOpcodesLink(0x35),
    },
    {
      name: 'execution-specs',
      url: ethSpecsOpcodeSrc(MainnetHardforks.Shanghai, OpcodeGroups.Environment, 163),
    },
  ],
  supportedHardforks: getHardforksFrom(MainnetHardforks.Frontier),
};
