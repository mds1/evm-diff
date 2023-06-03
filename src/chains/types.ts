import { Chain as Metadata } from '@wagmi/chains';
import { Address } from 'viem';

type PrecompileParam = {
  byteStart: number;
  byteLength: number;
  name: string;
  description: string;
};

// Some precompiles are contracts that the chain places at a specific address,
// which is why some fields are optional.
export type Precompile = {
  address: Address;
  name: string;
  description: string;
  minGas?: number;
  input?: PrecompileParam[];
  output?: PrecompileParam[];
  references: string[];
};

export type Chain = {
  metadata: Metadata;
  precompiles: Precompile[];
};
