import { MainnetHardfork, getMainnetHardforksFrom } from '@/chains/mainnet/hardforks';
import {
  OpcodeGroup,
  ethSpecsOpcodeSrc,
  evmCodesOpcodesLink,
  evmCodesPlaygroundLink,
} from '@/lib/opcodes';
import { Opcode } from '@/types';

export const returndatasize: Opcode = {
  number: 0x3d,
  name: 'returndatasize',
  description: 'Get size of output data from the previous call from the current environment',
  minGas: 2,
  outputs: [
    {
      name: 'size ',
      description: 'The byte size of the return data from the last executed sub context',
    },
  ],
  examples: [
    {
      output: '32',
    },
  ],
  playgroundLink: evmCodesPlaygroundLink(
    '%27gCJWthat%20cJX-ichB.(*Y7F7jjjjjjjjjjF)KY*6Q527*F6Q5260208~32KYq06020526029800~64KmmgC!_X-ith_WcodVabove~77))mCREATE%20gPuts_new%20X%20addres.on_stackmmgCall_deployed%20X))))mDUP5G4%200xj*mSTATICCALLmmgNow-Vshould%20havVourB%20data%20sizVof%2032mRETURNDATASIZEm%27~G1%20qQQQm%5Cnj***g%2F%2F%20_%20thVYG(0xXcontractWconstructor%20Ve%20Q000KmMSTOREJ!.a%20GmPUSHB%20return86QF3qqqq.s%20-%20w*FF)~0(32%20!reate%01!()*-.8BGJKQVWXY_gjmq~_'
  ),
  errorCases: ['Not enough gas', 'Stack overflow'],
  notes: ['A sub context can be created with CALL, CALLCODE, DELEGATECALL or STATICCALL'],
  references: [
    evmCodesOpcodesLink(0x3d),
    ethSpecsOpcodeSrc(MainnetHardfork.Shanghai, OpcodeGroup.Environment, 384),
  ],
  supportedHardforks: getMainnetHardforksFrom(MainnetHardfork.Byzantium),
};
