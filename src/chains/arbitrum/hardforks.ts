// List of Arbitrum upgrades or hard forks.
// https://forum.arbitrum.foundation/t/arbitrum-arbos-upgrades/19695
// https://github.com/OffchainLabs/nitro/blob/17468a832e7430762911a9a202903aea79f9a047/cmd/chaininfo/arbitrum_chain_info.json
export enum ArbitrumHardfork {
  ArbOS1,
  ArbOS2,
  ArbOS6,
  ArbOS10,
  ArbOS11,
}

export const CURRENT_ARBITRUM_HARDFORK = ArbitrumHardfork.ArbOS11;

// Format Arbitrum hardforks according to the pattern 'ArbOS Version {number}'.
const formattedArbitrumHardforks = (): string[] => {
  return Object.values(ArbitrumHardfork)
    .filter((v) => typeof v === 'string')
    .map((v, _) => {
      const regex = /ArbOS(.*)/;
      const match = v.toString().match(regex);
      if (match) {
        const version = match[1];
        return `ArbOS Version ${version}`;
      }
      return v.toString();
    });
};

// Retrieve all the hard forks from the starting hard fork to the current mainnet hard fork.
export const getArbitrumHardforksFrom = (startingHardfork: ArbitrumHardfork): string[] =>
  getArbitrumHardforksFromTo(startingHardfork, CURRENT_ARBITRUM_HARDFORK);

// Retrieve an array of hardforks from a starting hardfork to an ending hardfork (inclusive).
export const getArbitrumHardforksFromTo = (
  start: ArbitrumHardfork,
  end: ArbitrumHardfork
): string[] => {
  const arbitrumHardforks = formattedArbitrumHardforks();
  if (start > end) {
    throw new Error(
      `Error: the starting hard fork ${arbitrumHardforks[start]} (index: ${start}) occurred after the ending hard fork ${arbitrumHardforks[end]} (index: ${end}). Arguments are wrong or must have been reversed.`
    );
  }
  return arbitrumHardforks.slice(start, end + 1);
};
