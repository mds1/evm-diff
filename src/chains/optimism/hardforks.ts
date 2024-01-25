// List of Optimism's past Bedrock hard forks.
// https://docs.optimism.io/builders/node-operators/network-upgrades/overview#activations
// https://github.com/ethereum-optimism/specs/blob/main/specs/superchain-upgrades.md#post-bedrock-network-upgrades
export enum OptimismHardfork {
  Regolith,
  Canyon,
}

export const CURRENT_OPTIMISM_HARDFORK = OptimismHardfork.Canyon;

// Retrieve all the hard forks from the starting hard fork to the current mainnet hard fork.
export const getOptimismHardforksFrom = (startingHardfork: OptimismHardfork): string[] =>
  getOptimismHardforksFromTo(startingHardfork, CURRENT_OPTIMISM_HARDFORK);

// Retrieve an array of hardforks from a starting hardfork to an ending hardfork (inclusive).
export const getOptimismHardforksFromTo = (
  start: OptimismHardfork,
  end: OptimismHardfork
): string[] => {
  if (start > end) {
    throw new Error(
      `Error: the starting hard fork ${OptimismHardfork[start]} (index: ${start}) occured after the ending hard fork ${OptimismHardfork[end]} (index: ${end}). Arguments are wrong or must have been reversed.`
    );
  }

  // Create an array made of all the enum key indexes following by all the stringified keys.
  // For example, if you had an enum with two keys A and B, you would get ['0', '1', 'A', 'B'].
  // Then, we only keep the slice with the values (e.g. ['A', 'B']).
  const array = Object.keys(OptimismHardfork);
  const length = array.length / 2;
  const keys = array.slice(length);
  return keys.slice(start, end + 1);
};
