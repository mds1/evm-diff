export type Mempool = {
  name: string;
  description: string;
  rpcUrl: string;
  references: string[];
  notes?: string[];
  properties: {
    isPrivate: boolean;
    tracksIpAddress: boolean;
    refundsMev: boolean;
    includesFailedTxs: boolean;
    canSpecifyBuilders: boolean;
    isFree: boolean;
    configurable: boolean;
    txLifespan: number; // Seconds until kicked from mempool.
    rateLimit: string;
    burstRateLimit: string;
  };
};
