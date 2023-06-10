import { Address } from 'viem';

export type PrecompileParam = {
  byteStart: number;
  byteLength: number;
  name: string;
  description: string;
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

export type Predeploy = {
  address: Address;
  name: string;
  description: string;
  deprecated: boolean;
};
