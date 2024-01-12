export type EIP = {
  number: number;
  title: string;
  link: string;
  status: EIPState; // The status should always be `Final` for now.
  activeHardforks: string[];
  deprecated?: boolean;
  // Some EIPs have parameters, such as EIP-1559, but these parameters may not be the same on all
  // chains. This field is intended to list the names and values of any parameters that exist.
  parameters?: EIPParameter[];
};

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
