import { Chain as Metadata } from '@wagmi/chains';
import { Opcode } from './opcode';
import { Precompile, Predeploy } from './precompiles';

export type Chain = {
  metadata: Metadata;
  precompiles: (Precompile | Predeploy)[];
  opcodes: Opcode[];
};
