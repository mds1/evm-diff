export type Variable = {
  name: string;
  description: string;
  expression?: string;
  variables?: Variable[];
};

type Memory = {
  before: string;
  after: string;
};

export type Storage = {
  before: Record<string, string>;
  after: Record<string, string>;
};

export type Example = {
  input?: string | string[];
  output?: string | string[];
  memory?: Memory;
  storage?: Storage;
};

type ComputationCost = Partial<Variable> & Required<Pick<Variable, 'expression'>>;

type GasComputation = {
  staticGasCost: ComputationCost;
  dynamicGasCost: ComputationCost;
};

export type Reference = {
  name: string;
  url: string;
};

export type Opcode = {
  number: number;
  name: string;
  description: string;
  minGas: number;
  gasComputation?: GasComputation;
  refunds?: string;
  inputs?: Variable[];
  outputs?: Variable[];
  examples: Example[];
  playgroundLink?: string;
  errorCases: string[];
  notes?: string[];
  references: Reference[];
  supportedHardforks: string[];
};
