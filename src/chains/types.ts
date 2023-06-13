import { Chain as Metadata } from '@wagmi/chains';
import { Address } from 'viem';

type Only<T, K extends keyof T> = {
  [P in K]: T[P];
};

type PrecompileParam = {
  byteStart: number;
  byteLength: number;
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
  before: string;
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
  references: string[];
};

export type UndefinedOpcode = Only<Opcode, 'number' | 'name' | 'description' | 'references'>;

export type OpcodeWithoutPlaygroundLink = Omit<Opcode, 'playgroundLink'>;

export type OpcodeMap = {
  [key: number]: Opcode | UndefinedOpcode;
};

export type Chain = {
  metadata: Metadata;
  precompiles: (Precompile | Predeploy)[];
  opcodes: OpcodeMap;
};
