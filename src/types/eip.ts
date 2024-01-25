export type EIP = {
  number: number;
  title: string;
  category: EIPCategory;
  type: EIPType;
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
  Execution,
  Consensus,
}

export enum EIPType {
  Core,
  Networking,
  Interface,
  ERC,
  Meta,
  Informational,
}

export enum EIPState {
  Draft,
  Review,
  LastCall,
  Final,
  Stagnant,
  Withdrawn,
  Living,
}

export type EIPParameter = {
  name: string;
  value: string | number | bigint | boolean;
};
