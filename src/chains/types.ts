import { Chain as Metadata } from '@wagmi/chains';
import { Address } from 'viem';

export type SignatureType = {
  prefixByte: number;
  description: string;
  // The data that is RLP encoded and signed to generate a signed transaction.
  signedData: string[] | undefined;
  // Some signature types are used to sign transactions, others are used to sign data.
  signs: 'transaction' | 'data' | undefined;
  references: string[];
  notes?: string[];
};

type PrecompileParam = {
  byteStart: number | string;
  byteLength: number | string;
  name: string;
  description: string;
};

type Variable = {
  name: string;
  description: string;
  expression?: string;
};

type GasComputation = {
  name: string;
  description: string;
  expression: string;
  variables: Variable[];
};

type Memory = {
  before?: string;
  after: string;
};

type Example = {
  input?: string | string[];
  output?: string;
  memory?: Memory;
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
  notes?: string[];
};

type Reference = {
  name: string;
  url: string;
};

export type Opcode = {
  number: number;
  name: string;
  description: string;
  minGas: number;
  gasComputation?: GasComputation;
  inputs?: Variable[];
  outputs?: Variable[];
  examples: Example[];
  playgroundLink?: string;
  errorCases: string[];
  notes?: string[];
  references: Reference[];
};

export type Chain = {
  metadata: Metadata;
  precompiles: (Precompile | Predeploy)[];
  signatureTypes: SignatureType[];
  opcodes: Partial<Opcode>[];
};