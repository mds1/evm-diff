import type { Address } from 'viem';

type PredeployBase = {
	address: Address;
	name: string;
	description: string;
	deprecated: boolean;
	references: string[];
};

type StandardPredeploy = PredeployBase & {
	logicAbi: string[];
};

type ProxiedPredeploy = PredeployBase & {
	proxyAbi: string[];
	logicAbi: string[];
	logicAddress: Address;
};

export type Predeploy = StandardPredeploy | ProxiedPredeploy;
