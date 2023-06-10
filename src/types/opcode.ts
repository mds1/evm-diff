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
  input: string | string[];
  output?: string;
  memory?: Memory;
};

export type Opcode = {
  number: number;
  name: string;
  description: string;
  minGas: number;
  gasComputation?: GasComputation;
  inputs: Variable[];
  outputs: Variable[];
  examples: Example[];
  playgroundLink?: string;
  errorCases: string[];
  notes: string[];
  references: string[];
};
