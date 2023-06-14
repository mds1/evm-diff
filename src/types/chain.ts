import { Chain as Metadata } from '@wagmi/chains';
import { Opcode } from './opcode';
import { Precompile, Predeploy } from './precompile';
import { SignatureType } from './signatureType';

export type Chain = {
  metadata: Metadata;
  precompiles: (Precompile | Predeploy)[];
  signatureTypes: SignatureType[];
  opcodes: Partial<Opcode>[];
};
