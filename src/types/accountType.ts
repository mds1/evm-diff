export type AccountType = {
  name: string;
  description: string;
  references: string[];
  properties: {
    canBatchTxs: boolean;
    canInitiateTxs: boolean;
    hasCode: boolean;
    hasKeyPair: boolean;
    hasStorage: boolean;
  };
};
