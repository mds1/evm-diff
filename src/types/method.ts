export type Method = {
  name: string;
  namespace: MethodNamespace;
  description: string;
  parameters?: MethodVariable[];
  return: MethodVariable;
  examples?: MethodExample[];
  references: string[];
};

export type MethodVariable = {
  type: string;
  description: string;
};

export type MethodExample = {
  description?: string;
  parameters: string[];
  result: string;
};

export enum MethodNamespace {
  Web3,
  Net,
  Eth,
}
