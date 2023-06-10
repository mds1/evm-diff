import { Chain as Metadata } from '@wagmi/chains';
import { Address } from 'viem';

type PrecompileParam = {
  byteStart: number | string;
  byteLength: number | string;
  name: string;
  description: string;
};

export type Predeploy = {
  address: Address;
  name: string;
  description: string;
  deprecated: boolean;
};

export type Precompile = {
  address: Address;
  name: string;
  description: string;
  minGas: number;
  input: PrecompileParam[];
  output: PrecompileParam[];
  references: string[];
};

export type Chain = {
  metadata: Metadata;
  precompiles: (Precompile | Predeploy)[];
};
