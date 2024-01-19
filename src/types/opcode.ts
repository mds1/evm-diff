export type Opcode = {
  number: number;
  name: string;
  description: string;
  minGas: number;
  gasComputation?: GasComputation;
  inputs?: OpcodeVariable[];
  outputs?: OpcodeVariable[];
  examples: OpcodeExample[];
  playgroundLink?: string;
  errorCases: string[];
  notes?: string[];
  references: string[];
  supportedHardforks: string[];
};

export type OpcodeVariable = {
  name: string;
  description: string;
  expression?: string;
  variables?: OpcodeVariable[];
};

type Memory = {
  before: string;
  after: string;
};

export type Storage = {
  before: Record<string, string>;
  after: Record<string, string>;
};

export type OpcodeExample = {
  description?: string;
  input?: string | string[];
  output?: string | string[];
  memory?: Memory;
  storage?: Storage;
  calldata?: string;
  code?: string;
  returndata?: string;
};

type ComputationCost = Partial<OpcodeVariable> & Required<Pick<OpcodeVariable, 'expression'>>;

export type GasComputation = {
  staticGasCost: ComputationCost;
  dynamicGasCost: ComputationCost;
  refunds?: string;
};
