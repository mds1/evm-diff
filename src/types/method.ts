export type Method = {
  name: string;
  namespace: MethodNamespace;
  description: string;
  parameters?: MethodVariable[];
  return: MethodVariable;
  example?: MethodExample;
};

export type MethodVariable = {
  type: MethodVariableType;
  description: string;
};

export enum MethodVariableType {
  String,
  Data,
}

export type MethodExample = {
  parameters: string[];
  result: string;
};

export enum MethodNamespace {
  Web3,
  Net,
  Eth,
}
