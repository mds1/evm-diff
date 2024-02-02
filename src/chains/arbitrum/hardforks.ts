// List of Arbitrum upgrades or hard forks.
// https://forum.arbitrum.foundation/t/arbitrum-arbos-upgrades/19695
export enum ArbitrumHardfork {
  ArbOS11,
}

export const CURRENT_ARBITRUM_HARDFORK = ArbitrumHardfork.ArbOS11;

// Retrieve all the hard forks from the starting hard fork to the current mainnet hard fork.
export const getArbitrumHardforksFrom = (startingHardfork: ArbitrumHardfork): string[] =>
  getArbitrumHardforksFromTo(startingHardfork, CURRENT_ARBITRUM_HARDFORK);

// Retrieve an array of hardforks from a starting hardfork to an ending hardfork (inclusive).
export const getArbitrumHardforksFromTo = (
  start: ArbitrumHardfork,
  end: ArbitrumHardfork
): string[] => {
  if (start > end) {
    throw new Error(
      `Error: the starting hard fork ${ArbitrumHardfork[start]} (index: ${start}) occurred after the ending hard fork ${ArbitrumHardfork[end]} (index: ${end}). Arguments are wrong or must have been reversed.`
    );
  }

  // Create an array made of all the enum key indexes following by all the stringified keys.
  // For example, if you had an enum with two keys A and B, you would get ['0', '1', 'A', 'B'].
  // Then, we only keep the slice with the values (e.g. ['A', 'B']).
  const array = Object.keys(ArbitrumHardfork);
  const length = array.length / 2;
  const keys = array.slice(length);
  return keys.slice(start, end + 1);
};
