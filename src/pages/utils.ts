import { chains } from '@/chains';

export const findChain = (chainId: string) => {
  try {
    const id = BigInt(chainId);
    if (id <= 0n) return undefined;
    return Object.values(chains).find((chain) => BigInt(chain.metadata.id) === id);
  } catch (e) {
    return undefined; // `chainId` could not be parsed as a `BigInt`.
  }
};
