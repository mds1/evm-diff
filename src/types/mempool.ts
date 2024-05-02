export type Mempool = {
	name: string;
	description: string;
	rpcUrl: string;
	references: string[];
	notes?: string[];
	// All properties are private, and a missing field indicates that the property is unknown.
	properties: {
		isPrivate?: boolean;
		tracksIpAddress?: boolean;
		refundsMev?: boolean;
		includesFailedTxs?: boolean;
		canSpecifyBuilders?: boolean;
		isFree?: boolean;
		configurable?: boolean;
		txLifespan?: number; // Seconds until kicked from mempool.
		rateLimit?: string;
		burstRateLimit?: string;
	};
};
