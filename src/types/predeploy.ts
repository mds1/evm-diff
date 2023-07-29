import { Address } from 'viem';

export type Predeploy = {
  address: Address;
  name: string;
  description: string;
  abi: string[];
  deprecated: boolean;
  references: string[];
};
