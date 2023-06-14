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
