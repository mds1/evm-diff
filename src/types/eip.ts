export type EIP = {
	number: number;
	title: string;
	category: EIPCategory;
	status: EIPState; // The status should always be `Final` for now.
	activeHardforks: string[];
	deprecated?: boolean;
	// Some EIPs have parameters, such as EIP-1559, but these parameters may not be the same on all
	// chains. This field is intended to list the names and values of any parameters that exist.
	parameters?: EIPParameter[];
	notes?: string[];
	references: string[];
};

// EIPCategory defines if the EIP is execution or consensus related.
export enum EIPCategory {
	Execution = 0,
	Consensus = 1,
}

export enum EIPState {
	Draft = 0,
	Review = 1,
	LastCall = 2,
	Final = 3,
	Stagnant = 4,
	Withdrawn = 5,
	Living = 6,
}

export type EIPParameter = {
	name: string;
	value: string | number | bigint | boolean;
};
