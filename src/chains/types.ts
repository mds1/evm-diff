import { Chain as Metadata } from '@wagmi/chains';
import { Address } from 'viem';

export type SignatureType = {
  prefixByte: number;
  description: string;
  // The data that is RLP encoded and signed to generate a signed transaction.
  signedData: string[] | undefined;
  // Some signature types are used to sign transactions, others are used to sign data.
  signs: 'transaction' | 'data' | undefined;
  references: string[];
  notes?: string[];
};

type PrecompileParam = {
  byteStart: number | string;
  byteLength: number | string;
  name: string;
  description: string;
};

export type Predeploy = {
  address: Address;
  name: string;
  description: string;
  deprecated: boolean;
};

export type Precompile = {
  address: Address;
  name: string;
  description: string;
  minGas: number;
  input: PrecompileParam[];
  output: PrecompileParam[];
  references: string[];
  notes?: string[];
};

export type Chain = {
  metadata: Metadata;
  precompiles: (Precompile | Predeploy)[];
  signatureTypes: SignatureType[];
};
