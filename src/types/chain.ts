import { Chain as Metadata } from '@wagmi/chains';
import { Opcode } from './opcode';
import { Precompile } from './precompile';
import { Predeploy } from './predeploy';
import { SignatureType } from './signatureType';

export type Chain = {
  metadata: Metadata;
  precompiles: Precompile[];
  predeploys: Predeploy[];
  signatureTypes: SignatureType[];
  opcodes: Partial<Opcode>[];
};
