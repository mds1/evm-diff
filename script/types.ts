export type Metadata = {
	name: string;
	chain: string;
	icon?: string;
	rpc: string[];
	features?: Feature[];
	faucets: string[];
	nativeCurrency: NativeCurrency;
	infoURL: string;
	shortName: string;
	chainId: number;
	networkId: number;
	slip44: number;
	ens?: Ens;
	explorers?: Explorer[];
	title?: string;
};

export type Ens = {
	registry: string;
};

export type Explorer = {
	name: string;
	url: string;
	standard: string;
	icon?: string;
};

export type Feature = {
	name: string;
};

export type NativeCurrency = {
	name: string;
	symbol: string;
	decimals: number;
};
