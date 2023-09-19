import { Address } from 'viem';

export enum DeployedContractKind {
  WrappedNativeAsset,
  Utility,
}

type DeployedContractBase = {
  name: string;
  description: string;
  kind: DeployedContractKind;
  tokenName?: string;
  tokenSymbol?: string;
  address: Address;
  deploymentInstructions?: string;
  references: string[];
  notes?: string[];
};

export type StandardDeployedContract = DeployedContractBase & {
  logicAbi: string[];
};

export type ProxiedDeployedContract = DeployedContractBase & {
  proxyAbi: string[];
  logicAbi: string[];
  logicAddress: Address;
};

export type DeployedContract = StandardDeployedContract | ProxiedDeployedContract;
