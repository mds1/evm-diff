import { Address } from 'viem';

type PrecompileParam = {
  byteStart: number | string;
  byteLength: number | string;
  name: string;
  description: string;
};

export type PrecompileBase = {
  address: Address;
  name: string;
  description: string;
  minGas?: number;
  deprecated: boolean;
  references: string[];
  notes?: string[];
};

export type PrecompileInputOutput = PrecompileBase & {
  input: PrecompileParam[];
  output: PrecompileParam[];
};

export type PrecompileAbi = PrecompileBase & {
  abi: string[];
};

export type Precompile = PrecompileInputOutput | PrecompileAbi;
