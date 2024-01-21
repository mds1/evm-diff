export type Method = {
  name: string;
  namespace: MethodNamespace;
  description: string;
  parameters?: MethodVariable[];
  return: MethodVariable;
  example?: MethodExample;
  references: string[];
};

export type MethodVariable = {
  type: string;
  description: string;
};

export type MethodExample = {
  parameters: string[];
  result: string;
};

export enum MethodNamespace {
  Web3,
  Net,
  Eth,
}
